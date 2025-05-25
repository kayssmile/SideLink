from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from rest_framework_simplejwt.tokens import RefreshToken
from apps.usermanagment.models import RegisteredUser
from apps.publicservice.models import PublicService
from apps.analytics.models import AnalyticsDataEntry


class AnalyticsDataViewTests(APITestCase):

    def setUp(self):
        """
        Setup data for analytics endpoint tests.
        """
        self.user = RegisteredUser.objects.create_user(
            email='dashboarduser@example.com',
            password='SecurePass123!'
        )
        self.user1 = RegisteredUser.objects.create(email="a@test.ch")
        PublicService.objects.create(service_type="offer", public_profile_id=self.user.public_profile, user=self.user)
        PublicService.objects.create(service_type="search", public_profile_id=self.user1.public_profile, user=self.user1)
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.auth_header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}
      
    def test_get_analytic_data(self):
        """
        Test dashboard data retrieval for an authenticated user.
        """
        url = reverse('analytics_data')
        response = self.client.get(url, **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('public_services', response.data)
        self.assertEqual(response.data['public_services'], PublicService.objects.count())
        self.assertIn('public_profiles', response.data)
        self.assertEqual(response.data['public_profiles'], RegisteredUser.objects.count())
        self.assertIn('offers', response.data)
        self.assertEqual(response.data['offers'], PublicService.objects.filter(service_type='offer').count())
        self.assertIn('searches', response.data)
        self.assertEqual(response.data['searches'], PublicService.objects.filter(service_type='search').count())
        self.assertIn('offers_per_category', response.data)
        self.assertIn('searches_per_category', response.data)
        self.assertIn('offers_per_region', response.data)
        self.assertIn('searches_per_region', response.data)
        self.assertIn('registrations_per_month_and_year', response.data)
        self.assertIn('registrations_without_search_and_offer', response.data)
        self.assertIn('conversation_rate_registrations', response.data)

    def test_get_analytics_unauthenticated(self):
        """
        Test get data without authentication.
        """
        url = reverse('dashboard_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_create_analytics_data_entry(self):
        """
        Test fetching all public service entries.
        """
        url = reverse('create_analytics_data_entry')
        response = self.client.post(url, {})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AnalyticsDataEntry.objects.count(), 1)

    def test_create_analytics_data_invalid_request(self):
        """
        Test creating analytics data with dangerous content.
        """
        url = reverse('create_analytics_data_entry')
        response = self.client.post(url, {'dangerous_content': '<script>alert("Hacked!")</script>'})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)