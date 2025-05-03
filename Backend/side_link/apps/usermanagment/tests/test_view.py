from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usermanagment.models import RegisteredUser

class RegisterUserViewTest(APITestCase):
    def test_register_user_successfully(self):
        data = {
            "first_name": "Anna",
            "last_name": "Example",
            "email": "anna@example.com",
            "password": "strongpassword123",
            "profession": "Developer",
            "phone_number": "123456789",
            "street_address": "Street 1",
            "postal_code": "12345",
            "place": "Berlin",
            "region": "Berlin"
        }

        response = self.client.post("/api/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(RegisteredUser.objects.filter(email="anna@example.com").exists())

    def test_register_existing_email(self):
        RegisteredUser.objects.create_user(email="anna@example.com", password="pass")

        data = {
            "email": "anna@example.com",
            "password": "any",
            "first_name": "Anna",
            "last_name": "Test"
        }

        response = self.client.post("/api/auth/register/", data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class LoginViewTest(APITestCase):
    def setUp(self):
        self.user = RegisteredUser.objects.create_user(
            email="test@example.com",
            password="testpassword",
            first_name="Test",
            last_name="User"
        )

    def test_login_successful(self):
        data = {
            "email": "test@example.com",
            "password": "testpassword"
        }
        response = self.client.post("/api/auth/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("access", response.data)
        self.assertIn("refresh_token", response.data)

from rest_framework_simplejwt.tokens import RefreshToken

class RegisteredUserViewTest(APITestCase):
    def setUp(self):
        self.user = RegisteredUser.objects.create_user(
            email="auth@example.com",
            password="testpassword",
            first_name="John",
            last_name="Doe"
        )
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

    def test_get_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get("/api/auth/user/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "auth@example.com")

    def test_patch_user_profile(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        data = {"first_name": "Updated"}
        response = self.client.patch("/api/auth/user/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Updated")
