from django.test import TestCase
from apps.usermanagment.models import RegisteredUser
from apps.core.models import Region

class RegisteredUserModelTest(TestCase):

    def setUp(self):
        """
        Set up a test user instance.
        """
        self.region = Region.objects.create(name="region")
        self.user = RegisteredUser.objects.create_user(
            email='test@example.com',
            password='123',
            first_name='John',
            last_name='Doe',
            profession='Engineer',
            phone_number='123456789',
            street_address='Main Street 1',
            postal_code='8000',
            location='Zürich',
            region=self.region,
        )

    def test_user_creation(self):
        """
        Test that the user is created with correct attributes and the provided password.
        """
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(self.user.check_password('123'))
        self.assertEqual(self.user.first_name, 'John')
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)

    def test_public_profile_creation(self):
        """
        Test that a public profile is automatically created for the user.
        """
        self.assertIsNotNone(self.user.public_profile)

    def test_superuser_creation(self):
        """
        Test that a superuser is created with correct permissions.
        """
        superuser = RegisteredUser.objects.create_superuser(
            email='admin@example.com',
            password='adminPass123!'
        )
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_str_method(self):
        self.assertEqual(str(self.user), 'test@example.com')
