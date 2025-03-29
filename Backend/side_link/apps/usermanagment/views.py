from django.forms import ValidationError
from django.shortcuts import render, get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import RegisteredUser
from .serializers import RegisteredUserSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


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

    ''' 
    def get(self, request):
        user = RegisteredUser.objects.all()
        serializer = RegisteredUserSerializer(user, many=True)
        return Response(serializer.data)


    def put(self, request, pk):
        user = self.get_object(pk)
        serializer = RegisteredUserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)     


    def delete(self, request, pk):
        user = self.get_object(pk)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) '''
 

class RegisteredUser(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'email': user.email,
            'profession': user.profession,
            'phone_number': user.phone_number,
            'street_address': user.street_address,
            'postal_code': user.postal_code,
            'place': user.place,
            'region': user.region,
            'profile_picture': user.profile_picture.url if user.profile_picture else None,
            'public_profile': user.public_profile.public_profile_id if user.public_profile else None,
        }
        return Response(user_data, status=status.HTTP_200_OK)






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
