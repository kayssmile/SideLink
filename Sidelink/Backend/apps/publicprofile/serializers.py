from PIL import Image
from rest_framework import serializers
from apps.core.utils.validators import BasicValidators
from .models import PublicProfile

class PublicProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for publicprofile model.
    """
    class Meta:
        model = PublicProfile
        fields = '__all__'
        """
        fields = [
            'public_profile_id',
            'showed_name',
            'description',
            'contact_info',
            'public_profile_picture',
        ]"""

    def validate_public_profile_picture(self, image):
        """
        Validate uploaded image for size and content.
        """
        MAX_FILE_SIZE_MB = 5
        if image.size > MAX_FILE_SIZE_MB * 1024 * 1024:
            raise serializers.ValidationError("Image may not be larger than 5 MB.")
        try:
            img = Image.open(image)
            img.verify()
            img = Image.open(image)
        except Exception:
            raise serializers.ValidationError("Invalid image.")
        return image

    def validate(self, attrs):
        """
        Perform custom validation on incoming data.
        Uses BasicValidators to sanitize inputs and prevent XSS attacks.
        """
        return BasicValidators.validate_for_xss(attrs)    

    def create(self, validated_data):
        """
        Create and return a new PublicProfile instance using the validated data.
        """
        return PublicProfile.objects.create(**validated_data)