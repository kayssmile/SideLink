from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from unittest.mock import patch
from django.urls import reverse
from apps.usermanagment.models import RegisteredUser
from apps.publicservice.models import PublicService


class DashboardAndPublicDataTests(APITestCase):

    def setUp(self):
        """
        Setup user, auth token and data for dashboard tests.
        """
        self.user = RegisteredUser.objects.create_user(
            email='dashboarduser@example.com',
            password='SecurePass123!'
        )
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.auth_header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
        # test data
        self.user.public_profile.showed_name = "Test user"
        self.user.public_profile.save()
        self.service = PublicService.objects.create(user=self.user, public_profile_id=self.user.publicprofile, title="Test Service")

    def test_get_user_dashboard_data_authenticated(self):
        """
        Test dashboard data retrieval for an authenticated user.
        """
        url = reverse('dashboard_data')
        response = self.client.get(url, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('user_data', response.data)
        self.assertIn('public_profile_data', response.data)
        self.assertIn('public_services_data', response.data)
        self.assertEqual(len(response.data['public_services_data']), 1)

    def test_get_user_dashboard_data_unauthenticated(self):
        """
        Test dashboard data access without authentication.
        """
        url = reverse('dashboard_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_public_data(self):
        """
        Test fetching all public service entries.
        """
        url = reverse('public_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('public_services_data', response.data)
        self.assertEqual(len(response.data['public_services_data']), 1)


class ContactMessageTests(APITestCase):

    def setUp(self):
        """
        Prepare test data and settings for contact message submission.
        """
        self.url = reverse('contact_message')
        self.valid_payload = {
            "first_name": "Testfirst",
            "last_name": "Testlast",
            "email": "user@example.com",
            "subject": "Testbetreff",
            "message": "Dies ist eine Nachricht"
        }

    # To prevent logging we mock the logger
    @patch('apps.core.services.email_service.logger')
    @patch('apps.core.services.email_service.EmailMessage')
    def test_process_message_success(self, mock_send_email_system, mock_logger):
        """
        Test successful contact message and email sending.
        """
        mock_send_email_system = mock_send_email_system.return_value
        mock_send_email_system.send.return_value = 1
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    @patch('apps.core.services.email_service.logger')
    @patch('apps.core.services.email_service.EmailMessage')
    def test_process_message_email_fail(self, mock_send_email_system, mock_logger):
        """
        Test failure when email sending fails.
        """
        mock_send_email_system = mock_send_email_system.return_value
        mock_send_email_system.send.return_value = 0
        response = self.client.post(self.url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
        self.assertEqual(response.data['message'], "Email could not be sent.") 

    def test_process_message_invalid_payload(self):
        """
        Test validation failure when required fields are missing.
        """
        payload = {
            "email": "user@example.com"
        }
        response = self.client.post(self.url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("subject", response.data)
        self.assertIn("message", response.data)
