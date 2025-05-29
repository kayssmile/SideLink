
# Third-party libraries
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Django modules
from django.contrib.auth.password_validation import validate_password

# Django apps
from apps.usermanagment.models import RegisteredUser
from apps.usermanagment.serializers import RegisteredUserSerializer, CustomUserSerializer

# Current-app modules

class RegisterUserView(APIView):
    """
    API endpoint for register a new user.
    """
    def post(self, request):
        """
        Handle POST requests to register a new user.
        Returns:
            - 201 Created with user data if successful
            - 400 Bad Request if validation fails or email already exists
        """
        if RegisteredUser.objects.filter(email=request.data.get('email')).exists():
            return Response(
            {"error": "A user with this email already exists"},
            status=status.HTTP_400_BAD_REQUEST
            )
        serializer = RegisteredUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

class RegisteredUserView(APIView):
    """
    API endpoint to retrieve and update the currently authenticated user.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handle GET request to retrieve authenticated user data.
        Returns:
            - 200 OK with user data
            - 401 Unauthorized: If the user is not authenticated.
        """
        user = request.user
        user_data = CustomUserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        """
        Handle PATCH request to partially update authenticated user data.
        Returns:
            - 200 OK with updated user data
            - 400 Bad Request if validation fails
            - 401 Unauthorized: If the user is not authenticated.
        """
        
        user = request.user
        if request.data.get('email') and request.data.get('email') != user.email:
            if RegisteredUser.objects.filter(email=request.data.get('email')).exists():
                return Response(
                {"error": "A user with this email already exists"},
                status=status.HTTP_400_BAD_REQUEST
                )
        serializer = CustomUserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request):
        """
        Handle DELETE request to delete the authenticated user.
        Returns:
            - 204 No Content if deletion is successful
            - 401 Unauthorized: If the user is not authenticated.
        """
        user = request.user
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)