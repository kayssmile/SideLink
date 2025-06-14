from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_spectacular.utils import extend_schema, OpenApiResponse, OpenApiParameter
from .models import PublicProfile
from .serializers import PublicProfileSerializer


class PublicProfileView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        request=PublicProfileSerializer,
        responses={
            200: OpenApiResponse(
                description="Public profile successfully updated",
                response=PublicProfileSerializer,
            ),
            400: OpenApiResponse(
                description="Invalid input data",    
            ),
            401: OpenApiResponse(description="Unauthorized"),
            404: OpenApiResponse(description="Public profile not found")
        },
        description="Handle PATCH requests to update the authenticated user's public profile. Partial updates are supported (only send the fields you want to update).",
        tags=["Public Profile"]
    )
    def patch(self, request):
        user = request.user
        public_profile = user.public_profile
        serializer = PublicProfileSerializer(public_profile, data=request.data,  partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@extend_schema(
    parameters=[
        OpenApiParameter(
            name='id',
            type=str,
            location=OpenApiParameter.QUERY,
            required=True,
            description='The unique identifier of the public profile',
        )
    ],
    responses={
        200: OpenApiResponse(
            description="Public profile delivered successfully",
            response=PublicProfileSerializer(many=False)
        ),
        400: OpenApiResponse(
            description="Missing or invalid ID parameter",
        ),
        404: OpenApiResponse(
            description="Profile not found",
        )
    },
    description="Retrieve a single public profile by its unique ID (public_profile_id). Requires the profile ID to be passed as a query parameter.",
    tags=["Public Profile"]
)
@api_view(['GET'])
def get_public_profile(request):
    request_public_profile_id = request.query_params.get('id')
    if not request_public_profile_id:
        return Response({'detail': 'ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        public_profile = PublicProfile.objects.get(public_profile_id=request_public_profile_id)
    except PublicProfile.DoesNotExist:
            return Response({'detail': 'Public profile not found'}, status=status.HTTP_404_NOT_FOUND)    
    public_profile_data = PublicProfileSerializer(public_profile, many=False).data
    return Response(public_profile_data, status=status.HTTP_200_OK)