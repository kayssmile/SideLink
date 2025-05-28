from rest_framework.exceptions import ValidationError as DRFValidationError
from django.test import TestCase
from django.test import TestCase
from django.core.exceptions import ValidationError as DjangoValidationError
from apps.core.utils.validators import BasicValidators, MinimumLengthValidator, UppercaseValidator, SpecialCharacterValidator


class BasicValidatorsTests(TestCase):
    def test_validate_basic_text_valid_input(self):
        """
        Test that valid input is returned cleaned and without HTML tags.
        """
        input_text = " <b>Hello World</b> "
        cleaned = BasicValidators.validate_basic_text(input_text)
        self.assertEqual(cleaned, "Hello World")

    def test_validate_basic_text_empty_input(self):
        """
        Test that empty input raises a ValidationError.
        """
        with self.assertRaises(DRFValidationError):
            BasicValidators.validate_basic_text("   ")

    def test_validate_for_xss_safe_input(self):
        """
        Test that safe input returns cleaned attributes.
        """
        attrs = {
            "name": "Alice",
            "message": "Hello, this is fine!"
        }
        cleaned = BasicValidators.validate_for_xss(attrs)
        self.assertEqual(cleaned["name"], "Alice")
        self.assertEqual(cleaned["message"], "Hello, this is fine!")

    def test_validate_for_xss_dangerous_input(self):
        """
        Test that dangerous input raises a ValidationError.
        """
        attrs = {
            "message": '<script>alert("XSS")</script>'
        }
        with self.assertRaises(DRFValidationError) as ctx:
            BasicValidators.validate_for_xss(attrs)
        self.assertIn("message", ctx.exception.detail)

    def test_validate_for_xss_strips_html(self):
        """
        Test that HTML tags are stripped from input.
        """
        attrs = {
            "message": "<b>Bold text</b> and <i>italic text</i>"
        }
        cleaned = BasicValidators.validate_for_xss(attrs)
        self.assertEqual(cleaned["message"], "Bold text and italic text")

         
class PasswordValidatorTests(TestCase):
    def test_minimum_length_validator_accepts_valid_password(self):
        """
        Test that a password of sufficient length passes the validator.
        """
        validator = MinimumLengthValidator()
        try:
            validator.validate("abcdef")
        except DjangoValidationError:
            self.fail("MinimumLengthValidator should not raise for valid password.")

    def test_minimum_length_validator_rejects_short_password(self):
        """
        Test that a short password raises a ValidationError.
        """
        validator = MinimumLengthValidator()
        with self.assertRaises(DjangoValidationError):
            validator.validate("abc")

    def test_uppercase_validator_accepts_valid_password(self):
        """
        Test that a password with an uppercase letter passes the validator.
        """
        validator = UppercaseValidator()
        try:
            validator.validate("Password123")
        except DjangoValidationError:
            self.fail("UppercaseValidator should not raise for valid password.")

    def test_uppercase_validator_rejects_lowercase_password(self):
        """
        Test that a password with no uppercase letters raises a ValidationError.
        """
        validator = UppercaseValidator()
        with self.assertRaises(DjangoValidationError):
            validator.validate("password123")

    def test_special_character_validator_accepts_valid_password(self):
        """
        Test that a password with a special character passes the validator.
        """
        validator = SpecialCharacterValidator()
        try:
            validator.validate("Hello@123")
        except DjangoValidationError:
            self.fail("SpecialCharacterValidator should not raise for valid password.")

    def test_special_character_validator_rejects_plain_password(self):
        """
        Test that a password without special characters raises a ValidationError.
        """
        validator = SpecialCharacterValidator()
        with self.assertRaises(DjangoValidationError):
            validator.validate("Password123")
