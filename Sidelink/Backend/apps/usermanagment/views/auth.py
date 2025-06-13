from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from apps.usermanagment.serializers import CustomTokenObtainPairSerializer
from apps.usermanagment.models import RegisteredUser
from apps.core.services.email_service import EmailService

from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from django.middleware.csrf import get_token

class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        """
        Handle PATCH request to change the user's password.
        Returns:
            - 200 OK if password change is successful
            - 400 Bad Request if current password is incorrect or new password is invalid
            - 401 Unauthorized if the user is not authenticated
        """
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        if not user.check_password(current_password):
            return Response({"detail": "Actual password is wrong"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(new_password, user=user)
        except Exception as e:
            return Response({"detail": list(e)}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response(status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    
    def post(self, request):
        """
        Sends a password reset link to the user's email address if it exists in the system.
        Request body:
            - email: The user's registered email address.
        Returns:
            200 OK: If the process was triggered (even if the email doesn't exist, for security).
            400 Bad Request: If the email field is missing.
            500 Internal Server Error: If the email sending fails unexpectedly.
        """
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = RegisteredUser.objects.get(email=email)
            # Generate token and UID for password reset link
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            client_url = settings.CLIENT_URL
            # Construct the password reset link
            reset_link = f"{client_url}/password-reset/{uid}/{token}/"
            # Send the email with the reset link
            sent_message = EmailService.send_email(to_email=user.email, subject="Passwort zurücksetzen", body=f"Klicke auf den folgenden Link, um dein Passwort zurückzusetzen: {reset_link}")
            if not sent_message:
                return Response({"message": "Email not sent"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        except RegisteredUser.DoesNotExist:
            # No failure handling if email is not registered
            pass 
        return Response({'detail': 'If Email is registered in our system, the link is sent.'}, status=status.HTTP_200_OK)

class PasswordResetView(APIView):
   
    def post(self, request):
        """
        Resets the password of a user using the token and UID from the password-reset-email.
        Request body:
            - uidb64: Base64-encoded user ID from reset link.
            - token: Token from reset link.
            - password: New password to be set.
        Returns:
            200 OK: If password is successfully reset.
            400 Bad Request: If token is invalid, link is malformed, or password validation fails.
        """
        try:
            # Decode the UID and retrieve the user
            uid = urlsafe_base64_decode(request.data.get('uidb64')).decode()
            user = RegisteredUser.objects.get(id=uid)
        except (RegisteredUser.DoesNotExist, ValueError, TypeError):
            return Response({"detail": "Invalid user ID or token."}, status=status.HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, request.data.get('token')):
            return Response({"detail": "Invalid user ID or token."}, status=status.HTTP_400_BAD_REQUEST)
        new_password = request.data.get('password')
        if not new_password:
            return Response({"detail": "Password is required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(new_password, user=user)
        except Exception as e:
            return Response({"detail": list(e)}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({"detail": "Passwort wurde erfolgreich zurückgesetzt."}, status=status.HTTP_200_OK)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    @method_decorator(csrf_protect)
    def post(self, request, *args, **kwargs):
        """
        Customized TokenObtainPairView to return access/refresh tokens
        """
        response = super().post(request, *args, **kwargs)
        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    
    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to obtain JWT tokens.
        Returns:
            Response: Contains access and refresh tokens.
        """
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"detail": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)          
        response = super().post(request, *args, **kwargs)
        return response

class CustomTokenBlacklistView(TokenBlacklistView):
    
    def post(self, request, *args, **kwargs):
        """
        Handle the POST request to refresh JWT tokens.
        Raises:
            ValidationError: If no refresh token is provided in the request.
        Returns:
            Response: Contains new access and refresh tokens.
        """
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"detail": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)
        response = super().post(request, *args, **kwargs)
        return response
    

#print(get_token(request))
    #print(request.headers.get('X-CSRFToken'))
@api_view(['GET'])
def csrf_token_view(request):
    token = get_token(request)
    return Response({'csrfToken': token}, status=status.HTTP_200_OK) 