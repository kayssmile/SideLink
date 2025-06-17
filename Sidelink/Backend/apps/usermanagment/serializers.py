from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError as DRFValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.timezone import now
from django.contrib.auth.password_validation import validate_password
from apps.core.utils.validators import BasicValidators
from apps.core.models import Region
from .models import RegisteredUser


class RegisteredUserSerializer(serializers.ModelSerializer):
    """
    Serializer for RegisteredUser model.
    """
    class Meta:
        model = RegisteredUser
        exclude = ['groups', 'user_permissions']

    def validate_password(self, value):
        """
        Validate the password using Django's built-in password validators.
        """
        try:
            validate_password(value)
        except DjangoValidationError as e:
            raise DRFValidationError({"password": list(e.messages)})
        return value

    def validate(self, attrs):
        """
        Perform custom validation on incoming data.
        Uses BasicValidators to sanitize inputs and prevent XSS attacks.
        """
        return BasicValidators.validate_for_xss(attrs)

    def create(self, validated_data):
        user = RegisteredUser.objects.create_user(**validated_data)
        return user


class CustomUserSerializer(serializers.ModelSerializer):
    """
    Serializer for public user information.
    Used to return limited user details.
     """
    region = serializers.PrimaryKeyRelatedField(
        queryset=Region.objects.all(),
        write_only=True,
    )
   
    region_name = serializers.StringRelatedField(
        many=False,
        read_only=True,
        source='region'
    )
    
    #region = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = RegisteredUser
        fields = ['id', 'first_name', 'last_name', 'email', 'profession', 'phone_number', 'street_address', 'postal_code', 'location', 'region', 'region_name', 'public_profile']


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom serializer for obtaining JWT tokens.
    Adds user details to the token response and performs additional validation.
    """
    
    def validate(self, attrs):
        """
        Validates user credentials and returns JWT token pair with user info.
        Raises:
            AuthenticationFailed: if the user does not exist in the system.
        Returns:
            dict: {
                'access': access token string,
                'refresh_token': refresh token string,
            }
        """
        email = attrs.get("email")
        password = attrs.get("password")
        try:
            user = RegisteredUser.objects.get(email=email)
        except RegisteredUser.DoesNotExist:
            raise serializers.ValidationError({"email": "User not found."})
        if not user.check_password(password):
            raise serializers.ValidationError({"password": "Incorrect password."})
        data = super().validate(attrs)
        user.last_login = now()
        user.save(update_fields=["last_login"])
        refresh_token = data.get('refresh')
        access_token = data.get('access')
        return {
            'access': access_token,
            'refresh_token': refresh_token,
        }
