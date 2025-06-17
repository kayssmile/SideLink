from django.test import TestCase
from apps.usermanagment.models import RegisteredUser
from apps.usermanagment.serializers import RegisteredUserSerializer
from apps.usermanagment.serializers import CustomTokenObtainPairSerializer
from apps.usermanagment.serializers import CustomUserSerializer
from apps.core.models import Region

class RegisteredUserSerializerTest(TestCase):
    
    def setUp(self):
        """
        Initializes user data for use in serializer tests.
        """
        self.region = Region.objects.create(name="region")
        self.user_data = {
            "first_name": "Alice",
            "last_name": "Test",
            "email": "alice@wonderland.com",
            "password": "securePassword123!",
            "profession": "EyeEngineer",
            "phone_number": "1234567890",
            "street_address": "Test Street 1",
            "postal_code": "12345",
            "location": "Heaven",
            "region": self.region.id
        }

    def test_serializer_valid(self):
        """
        Test if the serializer is valid with complete and correct data.
        """
        serializer = RegisteredUserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())

    def test_serializer_invalid_missing_data(self):
        """
        Test serializer validation failure when a required field is missing.
        """
        invalid_data = self.user_data.copy()
        del invalid_data["phone_number"]
        serializer = RegisteredUserSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("phone_number", serializer.errors)

    def test_serializer_invalid(self):
        """
        Test serializer validation failure with an invalid email format.
        """
        invalid_data = self.user_data.copy()
        invalid_data["email"] = "invalid-email"
        serializer = RegisteredUserSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

    def test_serializer_invalid_password(self):
        """
        Test serializer validation failure with invalid password.
        """
        invalid_data = self.user_data.copy()
        invalid_data["password"] = "short"
        serializer = RegisteredUserSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("password", serializer.errors)

    def test_serializer_invalid_xss(self):
        """
        Test serializer validation failure with XSS attack vectore.
        """
        invalid_data = self.user_data.copy()
        invalid_data["first_name"] = "<script>alert('XSS')</script>"
        serializer = RegisteredUserSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("first_name", serializer.errors)

    def test_create_user(self):
        """
        Test that a user is correctly created from valid serializer data.
        """
        serializer = RegisteredUserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, self.user_data["email"])
        self.assertTrue(user.check_password(self.user_data["password"]))


class CustomUserSerializerTest(TestCase):
    def setUp(self):
        """
        Creates a test user instance for serialization tests.
        """
        self.region = Region.objects.create(name="region")
        self.user = RegisteredUser.objects.create_user(
            email="bob@example.com",
            password="password123",
            first_name="Bob",
            last_name="Builder",
            profession="Worker",
            phone_number="5555",
            street_address="Bauweg 1",
            postal_code="77777",
            location="Baustadt",
            region=self.region
        )

    def test_serialized_output(self):
        """
        Test that the serializer returns the correct fields and excludes sensitive data.
        """
        serializer = CustomUserSerializer(self.user)
        data = serializer.data
        self.assertEqual(data['first_name'], "Bob")
        self.assertNotIn('password', data)
        self.assertIn('public_profile', data)


class CustomTokenObtainSerializerTest(TestCase):
    def setUp(self):
        """
        Creates a test user for authentication token generation tests.
        """
        self.region = Region.objects.create(name="region")
        self.user = RegisteredUser.objects.create_user(
            email="token@test.com",
            password="jwtPass123!",
            first_name="Token",
            last_name="Tester",
            profession="Tester",
            phone_number="123",
            street_address="JWT Road",
            postal_code="00000",
            location="Token Town",
            region=self.region
        )

    def test_valid(self):
        """
        Test token generation with valid credentials and that login time is updated.
        """
        data = {
            "email": "token@test.com",
            "password": "jwtPass123!"
        }
        last_login_before = self.user.last_login
        serializer = CustomTokenObtainPairSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        validated_data = serializer.validated_data
        self.assertIn("access", validated_data)
        self.assertIn("refresh_token", validated_data)
        self.user.refresh_from_db()
        last_login_after = self.user.last_login
        self.assertNotEqual(last_login_before, last_login_after)

    def test_invalid_password(self):
        """
        Test token request with an incorrect password is rejected.
        """
        invalid_data = {
             "email": "token@test.com",
            "password": "jwtNotpass123"
        }
        serializer = CustomTokenObtainPairSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("password", serializer.errors)
        self.assertIn("Incorrect password.", serializer.errors["password"])

    def test_invalid_email(self):
        """
        Test token request with an unregistered email is rejected.
        """
        invalid_data = {
            "email": "user@test.com",
            "password": "jwtPass123!"
        }
        serializer = CustomTokenObtainPairSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)
        self.assertIn("User not found.", serializer.errors["email"])
        