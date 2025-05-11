from django.forms import ValidationError

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.password_validation import validate_password

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView
from apps.usermanagment.serializers import CustomTokenObtainPairSerializer
from apps.usermanagment.models import RegisteredUser
from apps.core.services import email_service

from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes

class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        user = request.user
        current_password = request.data.get("current_password")
        new_password = request.data.get("new_password")
        if not user.check_password(current_password):
            return Response({"detail": "Actual Password is wrong"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(new_password, user=user)
        except Exception as e:
            return Response({"detail": list(e)}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response(status=status.HTTP_200_OK)

class ForgotPasswordView(APIView):
    '''
    This view is used to send a password reset link to the user's email.
    The link contains token and userid to verify the link and user.
    '''
    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'detail': 'Email ist erforderlich.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            user = RegisteredUser.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.id))
            client_url = settings.CLIENT_URL
            reset_link = f"{client_url}/password-reset/{uid}/{token}/"
            sent_message = email_service.EmailService.send_email({"to_email": [user.email], "subject": "Passwort zurücksetzen", "text_content": f"Klicke auf den folgenden Link, um dein Passwort zurückzusetzen: {reset_link}"})
            if not sent_message:
                return Response({"message": "E-Mail konnte nicht gesendet werden"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        except RegisteredUser.DoesNotExist:
            pass 
        return Response({'detail': 'Falls die E-Mail registriert ist, wurde ein Link gesendet.'}, status=status.HTTP_200_OK)

class PasswordResetView(APIView):
    '''
    This view is used to reset the password of a user.
    To reset the password, the request must provide the token and uid from the email link.
    '''
    def post(self, request):
        try:
            uid = urlsafe_base64_decode(request.data.get('uidb64')).decode()
            user = RegisteredUser.objects.get(id=uid)
        except (RegisteredUser.DoesNotExist, ValueError, TypeError):
            return Response({"detail": "Ungültiger Link"}, status=status.HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, request.data.get('token')):
            return Response({"detail": "Token ist ungültig oder abgelaufen."}, status=status.HTTP_400_BAD_REQUEST)
        new_password = request.data.get('password')
        try:
            validate_password(new_password, user=user)
        except Exception as e:
            return Response({"detail": list(e)}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({"detail": "Passwort wurde erfolgreich zurückgesetzt."}, status=status.HTTP_200_OK)


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        data = response.data

        response.set_cookie(
            key='refreshToken',
            value=data['refresh_token'], # in production use data.pop('refresh_token')
            httponly=True,  # Verhindert den Zugriff durch JavaScript
            samesite='None',  # oder 'Strict' für strengere Sicherheitsvorgaben
            secure=True,  # Setze auf False, um Cookies auch über HTTP zu erlauben (bei Verwendung von HTTPS sollte dies auf True gesetzt werden)
            path='/',
            
        )

        return response
    

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Try to get refresh token from cookies first
        refresh_token = request.COOKIES.get('refreshToken')
        # If not in cookies, try to get from request body
        if not refresh_token:
            refresh_token = request.data.get('refresh')

        if not refresh_token:
            raise ValidationError({"refresh": "Refresh token is missing"})

        # Update request data with refresh token
        request.data['refresh'] = refresh_token

        response = super().post(request, *args, **kwargs)
        
        # Get new refresh token if rotation is enabled
        new_refresh_token = response.data.pop('refresh', None)
        
        # Set new refresh token in cookies if rotation occurred
        if new_refresh_token:
            response.set_cookie(
                key='refreshToken',
                value=new_refresh_token,
                httponly=True,
                secure=True,
                samesite='None',
                path='/',
                max_age=7 * 24 * 60 * 60  # 7 days
            )
            
        return response

class CustomTokenBlacklistView(TokenBlacklistView):
    def post(self, request, *args, **kwargs):
        # Get refresh token from cookies
        refresh_token = request.COOKIES.get('refreshToken')

        if not refresh_token:
            return Response({"detail": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)

        # Add the refresh token to the blacklist
        request.data['refresh'] = refresh_token
        response = super().post(request, *args, **kwargs)

        # Clear the cookie after blacklisting
        response.delete_cookie('refreshToken')

        return response
    

