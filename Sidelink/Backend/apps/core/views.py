from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from drf_spectacular.utils import extend_schema, OpenApiResponse, inline_serializer, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from django.conf import settings
from apps.publicprofile.models import PublicProfile
from apps.publicservice.models import PublicService
from apps.usermanagment.serializers import CustomUserSerializer
from apps.publicprofile.serializers import PublicProfileSerializer
from apps.publicservice.serializers import PublicServiceSerializer
from apps.core.services import email_service
from .serializers import ContactMessageSerializer


class UserDashboardData(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
   
    @extend_schema(
        responses={
            200: OpenApiResponse(
                description="Aggregated dashboard data for the authenticated user.",
                response=inline_serializer(
                    name='Dashboard Data Response',
                    fields={
                        'user_data': CustomUserSerializer(),
                        'public_profile_data': PublicProfileSerializer(),
                        'public_services_data': PublicServiceSerializer(many=True)
                    }
                ),
            ),
            401: OpenApiResponse(description="Unauthorized"),
            404: OpenApiResponse(description="User not found.")
        },
        description="API endpoint to retrieve dashboard data for an authenticated user.",
        tags=["Core"]
    )
    def get(self, request):
        user = request.user
        user_data = CustomUserSerializer(user).data
        public_profile_data = self._get_publicprofile_data(user)
        public_services_data = self._get_publicservices_data(user)
        dashboard_data = {'user_data': user_data , 'public_profile_data' : public_profile_data, 'public_services_data': public_services_data}
        return Response(dashboard_data, status=status.HTTP_200_OK)
    
    def _get_publicprofile_data(self, user):
        """
        Retrieve the serialized public profile for the given user.
        """
        try:
            public_profile = PublicProfile.objects.get(user=user)
            public_profile_data = PublicProfileSerializer(public_profile).data
            return public_profile_data
        except PublicProfile.DoesNotExist:
            return None
        
    def _get_publicservices_data(self, user):
        """
        Retrieve the serialized list of public services created by the user.
        """
        public_services = PublicService.objects.filter(user=user)
        if not public_services.exists():
            return []
        public_services_data = PublicServiceSerializer(public_services, many=True).data
        return public_services_data
    

@extend_schema(
    responses={
        200: OpenApiResponse(
            description="Delivers all public services.",
            response=inline_serializer(
                name='Public Data Response',
                fields={
                    'public_services_data': PublicServiceSerializer(many=True)
                }
            ),
        ),
    },
    description="Delivers all public services.",
    tags=["Core"]
)
@api_view(['GET'])
def get_public_data(request):
    public_services = PublicService.objects.select_related(
        'category',
        'region',
        'location',
        'user',
        'public_profile_id'                    
    ).prefetch_related(
    'sub_categories'
    ).all()
    serializer = PublicServiceSerializer(public_services, many=True)
    public_data = {'public_services_data': serializer.data}
    return Response(public_data, status=status.HTTP_200_OK)


@extend_schema(
    request=ContactMessageSerializer,
    responses={
        201: OpenApiResponse(
            description="Message successfully processed and sent",
            response=ContactMessageSerializer
        ),
        400: OpenApiResponse(
            description="Invalid input data",
            response=OpenApiTypes.OBJECT,
            examples=[
                OpenApiExample(
                    "Validation Error Example",
                    value={
                        "subject": ["This field is required."],
                        "message": ["This field is required."],
                    },
                    status_codes=['400']
                )
            ]
        ),
        500: OpenApiResponse(
            description="Email sending failed",
            response=OpenApiTypes.OBJECT,
            examples=[
                OpenApiExample(
                    "Email Error Example",
                    value={"message": "Email could not be sent."},
                    status_codes=['500']
                )
            ]
        )
    },
    description="API endpoint to process and send contact messages to the admin. Validates input and sends an email to the given email.",
    tags=["Core"]
)
@api_view(['POST'])
def process_message(request):
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        admin_email = settings.ADMIN_EMAIL
        sent_message = email_service.EmailService.send_email(to_email=admin_email, subject=serializer.validated_data['subject'], body=serializer.validated_data['message'])
        if not sent_message:
            return Response({"message": "Email could not be sent."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   