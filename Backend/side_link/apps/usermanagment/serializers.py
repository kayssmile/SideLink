from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import RegisteredUser

class RegisteredUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUser
        fields = '__all__'

    def create(self, validated_data):
        user = RegisteredUser.objects.create_user(**validated_data)
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisteredUser
        fields = ['id', 'first_name', 'last_name', 'email', 'profession', 'phone_number', 'street_address', 'postal_code', 'place', 'region', 'public_profile']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        
        try:  
            user = RegisteredUser.objects.get(email=attrs['email'])
        except RegisteredUser.DoesNotExist:
            raise AuthenticationFailed('user not available')
        
        data = super().validate(attrs)

        refresh_token = data.pop('refresh')

        data['user'] = CustomUserSerializer(user).data
      
        return {
            'access': data['access'],
            'user': data['user'],
            'refresh_token': refresh_token
        }
