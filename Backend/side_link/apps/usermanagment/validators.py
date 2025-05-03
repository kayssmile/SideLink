from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _

class MinimumLengthValidator:
    def validate(self, password, user=None):
        if len(password) < 6:
            raise ValidationError(
                _("The password must be at least 6 characters long."),
                code='password_too_short',
            )

    def get_help_text(self):
        return _("Your password must contain at least 6 characters.")


class UppercaseValidator:
    def validate(self, password, user=None):
        if not any(c.isupper() for c in password):
            raise ValidationError(
                _("The password must contain at least one uppercase letter."),
                code='password_no_upper',
            )

    def get_help_text(self):
        return _("Your password must include at least one uppercase letter.")


class SpecialCharacterValidator:
    def validate(self, password, user=None):
        if not any(char in "!@#$%^&*()_+-=[]{}|;:,.<>?" for char in password):
            raise ValidationError(
                _("The password must contain at least one special character."),
                code='password_no_special',
            )

    def get_help_text(self):
        return _("Your password must include at least one special character.")