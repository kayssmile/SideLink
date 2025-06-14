from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from unittest.mock import patch
from django.core import mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator
from apps.usermanagment.models import RegisteredUser


class ChangePasswordViewTest(APITestCase):
    def setUp(self):
        """ Create a user and obtain a valid JWT access token for authentication."""
        self.user = RegisteredUser.objects.create_user(
            email="auth@example.com",
            password="testPassword!123",
            first_name="John",
            last_name="Doe"
        )
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

    def test_change_password(self):
        """Test changing password successfully."""
        url = reverse('change_password')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        data = {
            "current_password": "testPassword!123",
            "new_password": "newPassword123!"
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("newPassword123!"))

    def test_change_password_invalid_current(self):
        """Test changing password with invalid current password."""
        url = reverse('change_password')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        data = {
            "current_password": "wrongpassword",
            "new_password": "newpassword123"
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_change_password_invalid_new(self):
        """Test changing password with invalid new password."""
        url = reverse('change_password')
        self.client.credentials(HTTP_AUTHORIZATION='Bearer ' + self.access_token)
        data = {
            "current_password": "testpassword",
            "new_password": "short"
        }
        response = self.client.patch(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class ForgotPasswordViewTest(APITestCase):
    def setUp(self):
        """ Create a user and obtain a valid JWT access token for authentication."""
        self.user = RegisteredUser.objects.create_user(
            email="auth@example.com",
            password="testPassword!123",
            first_name="John",
            last_name="Doe"
        )

    # To prevent real logging we mock the logger
    @patch('apps.core.services.email_service.logger')
    # to prevent real email sending, we mock the EmailMessage class
    @patch('apps.core.services.email_service.EmailMessage')
    def test_forgot_password(self, mock_send_email_system, mock_logger):
        """Test sending password reset email."""
        url = reverse('forgot_password')
        data = {
            "email": "auth@example.com",
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        mock_logger.info.assert_called_once()
        log_msg = mock_logger.info.call_args[0][0]
        self.assertIn('Sent email to auth@example.com', log_msg)
        self.assertIn('Passwort zurücksetzen', log_msg)

    def test_forgot_password_invalid_request(self):
        """Test sending password reset email with invalid email."""
        url = reverse('forgot_password')
        data = {"email": "",}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_forgot_password_email_not_exist(self):
        """Test password forgot with non existing email."""
        url = reverse('forgot_password')
        data = {"email": "user@notexists.com"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), 0)

    @patch("apps.core.services.email_service.EmailService.send_email", return_value=False)
    def test_forgot_passwort_email_failed(self, mock_send_email):
        """Test password forgot with email sending failure."""
        url = reverse('forgot_password')
        data = {"email": "auth@example.com"}
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        mock_send_email.assert_called_once()

class PasswortResetViewTest(APITestCase):
    def setUp(self):
        """ Create a user and generate valid uid and token."""
        self.user = RegisteredUser.objects.create_user(
            email="auth@example.com",
            password="testPassword!123",
            first_name="John",
            last_name="Doe"
        )
        self.uid = urlsafe_base64_encode(force_bytes(self.user.id))
        self.token = default_token_generator.make_token(self.user)
        self.url = reverse('password_reset')

    def test_password_reset(self):
        """Test resetting password with valid token."""
        data = {
            "password": "newPassword123!",
            "uidb64": self.uid,
            "token": self.token
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("newPassword123!"))

    def test_password_reset_invalid_userID(self):
        """Test resetting password with invalid token."""
        data = {
            "uidb64": "invalidID",
            "token": "invalid_token"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "Invalid user ID or token.")

    def test_password_reset_invalid_token(self):
        """Test resetting password with invalid token."""
        data = {
            "uidb64": self.uid,
            "token": "invalid_token"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "Invalid user ID or token.")

    def test_password_reset_invalid_password(self):
        """Test resetting password with invalid new password."""
        data = {
            "new_password": "short",
            "uidb64": self.uid,
            "token": self.token
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("detail", response.data)

    def test_password_reset_no_password(self):
        """Test resetting password with no new password."""
        data = {
            "uidb64": self.uid,
            "token": self.token
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "Password is required.")
     
# User - login
class CustomTokenObtainPairViewTest(APITestCase):
    def setUp(self):
        """ Create a user."""
        self.user = RegisteredUser.objects.create_user(
            email="test@example.com",
            password="testpassword",
            first_name="Test",
            last_name="User"
        )
        self.url = reverse("token_obtain_pair")

    def test_login_successful(self):
        """Test login with valid credentials."""
        data = {
            "email": "test@example.com",
            "password": "testpassword"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh_token", response.data)

    def test_login_invalid_credentials(self):
        """Test login with invalid credentials."""
        data = {
            "email": "not@exist.com",
            "password": "testpassword"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class CustomTokenRefreshViewTest(APITestCase):
    def setUp(self):
            """ Create a user and obtain a valid JWT refresh token for authentication."""
            self.user = RegisteredUser.objects.create_user(
                email="auth@example.com",
                password="testPassword!123",
                first_name="John",
                last_name="Doe"
            )
            self.refresh = RefreshToken.for_user(self.user)
            self.url = reverse('token_refresh')
    
    def test_refresh_token(self):
        """Test refreshing access token successfully."""
        data = {
            "refresh": self.refresh
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)

    def test_refresh_token_missing(self):
        """Test refreshing access token with missing refresh token."""
        data = {
            "refresh": ""
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class CustomTokenBlacklistViewTest(APITestCase):
    def setUp(self):
            """ Create a user and obtain a valid JWT refresh token for authentication."""
            self.user = RegisteredUser.objects.create_user(
                email="auth@example.com",
                password="testPassword!123",
                first_name="John",
                last_name="Doe"
            )
            self.refresh = RefreshToken.for_user(self.user)
            self.url = reverse('token_blacklist')

    def test_blacklist_token(self):
        """Test blacklisting refresh token successfully."""
        data = {
            "refresh": self.refresh
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_blacklist_token_missing(self):
        """Test blacklisting refresh token with missing refresh token."""
        data = {
            "refresh": ""
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_blacklist_token_invalid(self):
        """Test blacklisting refresh token with invalid refresh token."""
        data = {
            "refresh": "invalid_token"
        }
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)        