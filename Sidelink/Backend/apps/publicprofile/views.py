from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PublicProfile
from .serializers import PublicProfileSerializer


class PublicProfileView(APIView):
    """
    API endpoint for managing public-profile information.
    Allows authenticated users to update public profiles.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        """
        Handle PATCH requests to update the authenticated user's public profile.
        Returns:
            - 200 OK with updated profile data if successful
            - 400 Bad Request if validation fails
            - 404 Not Found if the public profile does not exist
            - 401 Unauthorized if the user is not authenticated
        """
        user = request.user
        public_profile = user.public_profile
        serializer = PublicProfileSerializer(public_profile, data=request.data,  partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_public_profile(request):
    """
    Retrieve a single public profile by its unique ID (public_profile_id).
    Query Parameters:
        - id (str): The unique identifier of the public profile.
    Returns:
        - 200 OK with profile data if found
        - 400 Bad Request if ID is not provided
        - 404 Not Found if no profile matches the provided ID
    """
    request_public_profile_id = request.query_params.get('id')
    if not request_public_profile_id:
        return Response({'detail': 'ID is required.'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        public_profile = PublicProfile.objects.get(public_profile_id=request_public_profile_id)
    except PublicProfile.DoesNotExist:
            return Response({'detail': 'Public profile not found'}, status=status.HTTP_404_NOT_FOUND)    
    public_profile_data = PublicProfileSerializer(public_profile, many=False).data
    return Response(public_profile_data, status=status.HTTP_200_OK)