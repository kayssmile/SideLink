from django.test import TestCase
from apps.core.serializers import ContactMessageSerializer
from apps.core.models import ContactMessage

class ContactMessageSerializerTests(TestCase):
    def setUp(self):
        """
        Set up default valid data for use in multiple tests.
        """
        self.valid_data = {
            'first_name': 'Test',
            'last_name': 'Doeer',
            'email': 'test.doeer@example.com',
            'subject': 'Contact Request',
            'message': 'I would like to know more about your services.'
        }

    def test_serializer_with_valid_data(self):
        """
        Test that serializer is valid when all fields are correct.
        """
        serializer = ContactMessageSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())

    def test_serializer_fails_with_short_first_name(self):
        """
        Test that serializer raises an error if first name is too short.
        """
        data = self.valid_data.copy()
        data['first_name'] = 'J'
        serializer = ContactMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('first_name', serializer.errors)

    def test_serializer_fails_with_short_last_name(self):
        """
        Test that serializer raises an error if last name is too short.
        """
        data = self.valid_data.copy()
        data['last_name'] = 'K'
        serializer = ContactMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('last_name', serializer.errors)

    def test_serializer_fails_with_short_subject(self):
        """
        Test that serializer raises an error if subject is too short.
        """
        data = self.valid_data.copy()
        data['subject'] = 'Hey'
        serializer = ContactMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('subject', serializer.errors)

    def test_serializer_fails_with_short_message(self):
        """
        Test that serializer raises an error if message is too short.
        """
        data = self.valid_data.copy()
        data['message'] = 'Too short'
        serializer = ContactMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('message', serializer.errors)

    def test_serializer_creates_contact_message(self):
        """
        Test that the serializer correctly creates a ContactMessage instance.
        """
        serializer = ContactMessageSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        instance = serializer.save()
        self.assertIsInstance(instance, ContactMessage)
        self.assertEqual(instance.first_name, 'Test')

    def test_serializer_validates_xss(self):
        """
        Test that the serializer sanitizes inputs to prevent XSS attacks.
        """
        data = self.valid_data.copy()
        data['message'] = '<script>alert("XSS")</script>'
        serializer = ContactMessageSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("message", serializer.errors)
        self.assertIn("Dangerous content found.", serializer.errors["message"][0])
