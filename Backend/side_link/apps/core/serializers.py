from rest_framework import serializers
from .models import ContactMessage
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
import html
import bleach


class ContactMessageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ContactMessage
        fields = [
            'first_name',
            'last_name',
            'email',
            'subject',
            'message'
        ]

    def validate_email(self, value):
        try:
            validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Bitte geben Sie eine gültige E-Mail-Adresse ein")
        return value.lower().strip()

    def validate_first_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Vorname muss mindestens 2 Zeichen lang sein")
        return html.escape(value)

    def validate_last_name(self, value):
        value = value.strip()
        return html.escape(value)

    def validate_subject(self, value):
        value = value.strip()
        if len(value) < 5:
            raise serializers.ValidationError("Betreff muss mindestens 5 Zeichen lang sein")
        if len(value) > 200:
            raise serializers.ValidationError("Betreff darf maximal 200 Zeichen lang sein")
        return html.escape(value)

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Nachricht muss mindestens 10 Zeichen lang sein")
        if len(value) > 2000:
            raise serializers.ValidationError("Nachricht darf maximal 2000 Zeichen lang sein")
        cleaned_message = bleach.clean(
            value,
            tags=[],
            attributes={},
            strip=True
        )
        return cleaned_message

    def validate(self, attrs):
        """
        Additional validation to check for potential XSS attacks.
        """
        for key, value in attrs.items():
            if isinstance(value, str):
                if any(tag in value.lower() for tag in ['<script', '<img', '<iframe', 'javascript:']):
                    raise serializers.ValidationError(
                        {key: "Potentiell gefährliche Inhalte entdeckt"}
                    )
                
        attrs = {k: v.strip() if isinstance(v, str) else v for k, v in attrs.items()}
        return attrs

    def create(self, validated_data):
        return ContactMessage.objects.create(**validated_data)