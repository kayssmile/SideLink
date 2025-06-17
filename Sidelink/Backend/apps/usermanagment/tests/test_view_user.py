from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from apps.usermanagment.models import RegisteredUser

class RegisterUserViewTest(APITestCase):
    valid_register_data = {
            "first_name": "Anna",
            "last_name": "Example",
            "email": "anna@example.com",
            "password": "strongPassword123!",
            "profession": "Developer",
            "phone_number": "123456789",
            "street_address": "Street 1",
            "postal_code": "12345",
            "location": "Berlin",
            "region": 1
        }
    invalid_register_data = {
            "first_name": "",
            "last_name": "Example",
            "email": "invalid-email",
            "password": "short",
            "profession": "Developer",
            "phone_number": "",
            "street_address": "",
            "postal_code": "",
            "location": "",
            "region": ""
        }
    
    def test_register_user_successfully(self):
        """Test successful user registration."""
        response = self.client.post("/api/auth/register/", self.valid_register_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(RegisteredUser.objects.filter(email="anna@example.com").exists())

    def test_register_user_invalid_data(self):
        """Test registration fails with invalid data."""
        response = self.client.post("/api/auth/register/", self.invalid_register_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertFalse(RegisteredUser.objects.filter(email="invalid-email").exists())

    def test_register_existing_email(self):
        """Test registration fails if email already exists."""
        RegisteredUser.objects.create_user(email="anna@example.com", password="pass")
        response = self.client.post("/api/auth/register/", self.valid_register_data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_public_profile_created(self):
        """Test public profile is automatically created on user registration."""
        response = self.client.post("/api/auth/register/", self.valid_register_data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = RegisteredUser.objects.get(email="anna@example.com")
        self.assertIsNotNone(user.public_profile)


class RegisteredUserViewTest(APITestCase):  
    def setUp(self):
        """ Create a user and obtain a valid JWT access token for authentication."""
        self.user = RegisteredUser.objects.create_user(
            email="auth@example.com",
            password="testpassword",
            first_name="John",
            last_name="Doe"
        )
        refresh = RefreshToken.for_user(self.user)
        self.access_token = str(refresh.access_token)

    def test_get_user_profile(self):
        """Test retrieving the authenticated user's profile."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.get("/api/auth/registered-user/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["email"], "auth@example.com")

    def test_patch_user_profile(self):
        """Test updating user's profile fields."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        data = {"first_name": "Updated"}
        response = self.client.patch("/api/auth/registered-user/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.first_name, "Updated")

    def test_delete_user_profile(self):
        """Test deleting the authenticated user's profile."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.access_token}')
        response = self.client.delete("/api/auth/registered-user/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        user_exists = RegisteredUser.objects.filter(id=self.user.id).exists()
        self.assertFalse(user_exists)

    def test_unauthenticated_access(self):
        """Test accessing user profile without authentication fails."""
        response = self.client.get("/api/auth/registered-user/")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)    
