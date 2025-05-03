from django.forms import ValidationError
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth.password_validation import validate_password


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RegisteredUser
from .serializers import RegisteredUserSerializer, CustomUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenBlacklistView


class RegisterUserView(APIView):

    def post(self, request):
        
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
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        # check if user is available
        user_data = CustomUserSerializer(user).data
        return Response(user_data, status=status.HTTP_200_OK)
    
    def patch(self, request):
        
        user = request.user
        serializer = CustomUserSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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