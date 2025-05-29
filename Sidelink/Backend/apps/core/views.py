from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from apps.publicprofile.models import PublicProfile
from apps.publicservice.models import PublicService
from apps.usermanagment.serializers import CustomUserSerializer
from apps.publicprofile.serializers import PublicProfileSerializer
from apps.publicservice.serializers import PublicServiceSerializer
from apps.core.services import email_service
from .serializers import ContactMessageSerializer

class UserDashboardData(APIView):
    """
    API endpoint to retrieve dashboard data for an authenticated user.
    Returns user account data, public profile information, and any public services 
    the user has created.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
   
    def get(self, request):
        """
        Handle GET request to return dashboard data for the authenticated user.
        Returns:
            - 200 OK with user, public profile, and public services data if user exists
            - 404 Not Found if user not found
        """
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
    

@api_view(['GET'])
def get_public_data(request):
    """
    API endpoint to retrieve all public profiles and public services.
    Returns:
        - 200 OK with all publicservices or [] if none exist.
    """
    public_services_data = PublicService.objects.all()
    public_services_data = PublicServiceSerializer(public_services_data, many=True).data
    public_data = {'public_services_data': public_services_data}
    return Response(public_data, status=status.HTTP_200_OK)

@api_view(['POST'])
def process_message(request):
    """
    API endpoint to process and send contact messages to the admin.
    Validates input and sends an email to the given email.
    Returns:
        - 201 Created if the message is sent and saved
        - 400 Bad Request if validation fails
        - 500 Internal Server Error if sending email fails
    """
    serializer = ContactMessageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        admin_email = settings.ADMIN_EMAIL
        sent_message = email_service.EmailService.send_email(to_email=admin_email, subject=serializer.validated_data['subject'], body=serializer.validated_data['message'])
        if not sent_message:
            return Response({"message": "Email could not be sent."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   