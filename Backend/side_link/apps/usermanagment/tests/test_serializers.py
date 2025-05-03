# your_app/tests/test_serializers.py

from django.test import TestCase
from apps.usermanagment.models import RegisteredUser
from apps.usermanagment.serializers import RegisteredUserSerializer

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.test import APIRequestFactory
from apps.usermanagment.serializers import CustomTokenObtainPairSerializer

class RegisteredUserSerializerTest(TestCase):
    
    def setUp(self):
        self.user_data = {
            "first_name": "Alice",
            "last_name": "Test",
            "email": "alice@example.com",
            "password": "securepassword123",
            "profession": "Engineer",
            "phone_number": "1234567890",
            "street_address": "Test Street 1",
            "postal_code": "12345",
            "place": "Testtown",
            "region": "Testregion"
        }

    def test_serializer_valid(self):
        serializer = RegisteredUserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())

    def test_create_user(self):
        serializer = RegisteredUserSerializer(data=self.user_data)
        self.assertTrue(serializer.is_valid())
        user = serializer.save()
        self.assertEqual(user.email, self.user_data["email"])
        self.assertTrue(user.check_password(self.user_data["password"]))  # Passwort wird gehashed

from apps.usermanagment.serializers import CustomUserSerializer

class CustomUserSerializerTest(TestCase):
    def setUp(self):
        self.user = RegisteredUser.objects.create_user(
            email="bob@example.com",
            password="password123",
            first_name="Bob",
            last_name="Builder",
            profession="Worker",
            phone_number="5555",
            street_address="Bauweg 1",
            postal_code="77777",
            place="Baustadt",
            region="Nord"
        )

    def test_serialized_output(self):
        serializer = CustomUserSerializer(self.user)
        data = serializer.data
        self.assertEqual(data['first_name'], "Bob")
        self.assertNotIn('password', data)



class CustomTokenSerializerTest(TestCase):
    def setUp(self):
        self.user = RegisteredUser.objects.create_user(
            email="token@test.com",
            password="jwtpass123",
            first_name="Token",
            last_name="Tester",
            profession="Tester",
            phone_number="123",
            street_address="JWT Road",
            postal_code="00000",
            place="Token Town",
            region="Authland"
        )

    def test_token_generation(self):
        data = {
            "email": "token@test.com",
            "password": "jwtpass123"
        }
        serializer = CustomTokenObtainPairSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        token_data = serializer.validated_data
        self.assertIn("access", token_data)
        self.assertIn("refresh_token", token_data)
        self.assertIn("user", token_data)
