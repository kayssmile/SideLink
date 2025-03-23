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

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        try:
            user = RegisteredUser.objects.get(email=attrs['email'])
        except RegisteredUser.DoesNotExist:
            raise AuthenticationFailed('user not available')
    
        data = super().validate(attrs)

        refresh_token = data.pop('refresh')

        data['user'] = {
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

        return {
            'access': data['access'],
            'user': data['user'],
            'refresh_token': refresh_token
        }



