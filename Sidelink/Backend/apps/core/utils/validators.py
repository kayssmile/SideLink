import bleach
from rest_framework.serializers import ValidationError as DRFValidationError
from django.core.exceptions import ValidationError as DjangoValidationError

class BasicValidators: 

    @staticmethod
    def validate_basic_text(value):
        """
        Validates a basic text input: must contain value and removes any HTML tags.
        Args:
            value: The text to validate.
        Returns:
            str: The cleaned text if valid.
        Raises:
            ValidationError: If the text is empty or contains invalid characters.
        """
        value = value.strip()
        if not value:
            raise DRFValidationError("This field may not be blank.")
        cleaned_value = bleach.clean(
            value,
            tags=[],
            attributes={},
            strip=True
        )
        return cleaned_value
    
    @staticmethod
    def validate_for_xss(attrs):
        """
        Checks for potential dangerous content in the attributes, and removes any HTML tags.
        Args:
            attrs: The attributes to validate.
        Returns:
            The cleaned attributes if valid.
        Raises:
            ValidationError: If any attribute contains potential XSS content.
        """
        for key, value in attrs.items():
            if isinstance(value, str):
                lower_val = value.lower()
                if any(x in lower_val for x in ['<script', '<img', '<iframe', 'javascript:', 'onerror', 'onload', '<link', '<object']):
                    raise DRFValidationError(
                        {key: "Dangerous content found."}
                    )
                attrs[key] = BasicValidators.validate_basic_text(value)

        return {k: v.strip() if isinstance(v, str) else v for k, v in attrs.items()}
    

"""
Custom validators for Django's authentication system.
"""
# Custom minimum length validator
class MinimumLengthValidator:
    def validate(self, password, user=None):
        if len(password) < 6:
            raise DjangoValidationError(
                "The password must be at least 6 characters long.",
                code='password_too_short',
            )

    def get_help_text(self):
        return "Your password must contain at least 6 characters."

# Custom uppercase letter validator
class UppercaseValidator:
    def validate(self, password, user=None):
        if not any(c.isupper() for c in password):
            raise DjangoValidationError(
                "The password must contain at least one uppercase letter.",
                code='password_no_upper',
            )

    def get_help_text(self):
        return "Your password must include at least one uppercase letter."

# Custom special character validator
class SpecialCharacterValidator:
    def validate(self, password, user=None):
        if not any(char in "!@#$%^&*()_+-=[]{}|;:,.<>?" for char in password):
            raise DjangoValidationError(
                "The password must contain at least one special character.",
                code='password_no_special',
            )

    def get_help_text(self):
        return "Your password must include at least one special character."