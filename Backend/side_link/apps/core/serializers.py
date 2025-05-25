import html
from rest_framework import serializers
from apps.core.utils.validators import BasicValidators
from .models import ContactMessage

class ContactMessageSerializer(serializers.ModelSerializer):
    """
    Serializer for handling contact form submissions.
    Validates, sanitizes, and saves contact messages submitted via the API.
    """
    class Meta:
        model = ContactMessage
        fields = [
            'first_name',
            'last_name',
            'email',
            'subject',
            'message'
        ]

    def validate_first_name(self, value):
        """
        Validates and sanitizes the first name.
        """
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Firstname must be at least 2 characters long")
        return value

    def validate_last_name(self, value):
        """
        Validates and sanitizes the last name.
        """
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("lastname must be at least 2 characters long")
        return value

    def validate_subject(self, value):
        """
        Validates and sanitizes the subject.
        """
        value = value.strip()
        if len(value) < 5:
            raise serializers.ValidationError("Subject must be at least 5 characters long")
        return value

    def validate_message(self, value):
        """
        Validates and sanitizes message.
        """
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Message must contain at least 10 characters")
        return value

    def validate(self, attrs):
        """
        Perform custom validation on incoming data.
        Uses BasicValidators to sanitize inputs and prevent XSS attacks.
        """
        return BasicValidators.validate_for_xss(attrs)    
        

    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)