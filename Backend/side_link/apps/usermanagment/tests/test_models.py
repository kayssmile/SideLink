from django.test import TestCase
from django.core.exceptions import ValidationError
from apps.usermanagment.models import RegisteredUser

class RegisteredUserModelTest(TestCase):

    def setUp(self):
        self.user = RegisteredUser.objects.create_user(
            email='test@example.com',
            password='123',
            first_name='John',
            last_name='Doe',
            profession='Engineer',
            phone_number='123456789',
            street_address='Main Street 1',
            postal_code='8000',
            place='Zürich',
            region='ZH',
        )

    def test_user_creation(self):
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertTrue(self.user.check_password('123'))
        self.assertEqual(self.user.first_name, 'John')
        self.assertTrue(self.user.is_active)
        self.assertFalse(self.user.is_staff)

    def test_superuser_creation(self):
        superuser = RegisteredUser.objects.create_superuser(
            email='admin@example.com',
            password='adminpass'
        )
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_str_method(self):
        self.assertEqual(str(self.user), 'test@example.com')
