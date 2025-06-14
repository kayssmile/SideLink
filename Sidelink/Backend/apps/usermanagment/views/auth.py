from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView, TokenVerifyView
from drf_spectacular.utils import extend_schema, OpenApiResponse, inline_serializer
from django.contrib.auth.password_validation import validate_password
from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from apps.usermanagment.serializers import CustomTokenObtainPairSerializer
from apps.usermanagment.models import RegisteredUser
from apps.core.services.email_service import EmailService


class ChangePasswordView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    @extend_schema(
        request=inline_serializer(
            name="PasswordChangeRequest",
            fields={
                "current_password": serializers.CharField(
                    help_text="Aktuelles Passwort",
                    style={'input_type': 'password'},
                ),
                "new_password": serializers.CharField(
                    help_text="Neues Passwort",
                    style={'input_type': 'password'},
                )
            }
        ),
        responses={
            200: OpenApiResponse(
                description="Password changed successfully",
                response=None
            ),
            400: OpenApiResponse(
                description="Invalid current password or new password validation failed",    
            ),
            401: OpenApiResponse(description="Unauthorized"),
            404: OpenApiResponse(description="User not found")
        },
        description="Handle PATCH request to change the user's password.",
        tags=["Authorisation"]
    )
    def patch(self, request):
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
    
    @extend_schema(
        request=inline_serializer(
            name="ForgotPasswordRequest",
            fields={
                "email": serializers.EmailField(
                    help_text="Registered email address of the user",
                )
            }
        ),
        responses={
            200: OpenApiResponse(
                description="If the email is registered, a password reset link is sent.",
            ),
            400: OpenApiResponse(
                description="Email field is missing or invalid.",
            ),
            500: OpenApiResponse(
                description="Internal server error if email sending fails."
            )
        },
        description="Sends a password reset link to the user's email address if it exists in the system.",
        tags=["Authorisation"]
    )
    def post(self, request):
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
   
    @extend_schema(
        tags=["Authorisation"],
        description="Resets the password of a user using the token and UID from the password-reset email.",
        request=inline_serializer(
            name="PasswordResetConfirmRequest",
            fields={
                "uidb64": serializers.CharField(
                    help_text="Base64-kodierte User-ID",
                ),
                "token": serializers.CharField(
                    help_text="Token aus der Passwort-Zurücksetzen-Mail",
                ),
                "password": serializers.CharField(
                    help_text="Neues Passwort",
                    style={'input_type': 'password'},
                )
            }
        ),
        responses={
            200: OpenApiResponse(
                description="Password was successfully reset.",
            ),
            400: OpenApiResponse(
                description="Invalid token, malformed data, or password validation error.",
            ),
        }
    )
    def post(self, request):
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

    @extend_schema(
        description="Customized TokenObtainPairView to return access/refresh tokens",
        tags=["Authorisation"]
    )
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return response
    
class CustomTokenRefreshView(TokenRefreshView):
    
    @extend_schema(
        description="Handle the POST request to obtain JWT tokens.",
        tags=["Authorisation"]
    )
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"detail": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)          
        response = super().post(request, *args, **kwargs)
        return response

class CustomTokenBlacklistView(TokenBlacklistView):
    
    @extend_schema(
        description="Handle the POST request to blacklist/invalidate JWT tokens.",
        tags=["Authorisation"]
    )
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return Response({"detail": "Refresh token is missing"}, status=status.HTTP_400_BAD_REQUEST)
        response = super().post(request, *args, **kwargs)
        return response


@extend_schema(
    description="Verify the validity of a JWT token.",
    responses={
        200: OpenApiResponse(description="Token is valid."),
        401: OpenApiResponse(description="Token is invalid or expired.")
    },
    tags=["Authorisation"]
)
class CustomTokenVerifyView(TokenVerifyView):
    pass

