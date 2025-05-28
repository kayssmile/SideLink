from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from apps.usermanagment.models import RegisteredUser
from rest_framework_simplejwt.tokens import RefreshToken


class PublicProfileViewTests(APITestCase):
    def setUp(self):
        """
        Create a test user, set up authentication, and update the public profile.
        """
        self.user = RegisteredUser.objects.create_user(
            email='testuser@example.com',
            password='TestPass123!'
        )
        self.user.public_profile.showed_name = 'Test User'
        self.user.public_profile.save()
        self.token = str(RefreshToken.for_user(self.user).access_token)
        self.auth_header = {'HTTP_AUTHORIZATION': f'Bearer {self.token}'}

    def test_patch_public_profile_success(self):
        """
        Test updating the public profile with valid data.
        """
        url = reverse('public_profile')
        data = {'showed_name': 'Updated Name'}
        response = self.client.patch(url, data, format='json', **self.auth_header)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['showed_name'], 'Updated Name')

    def test_patch_public_profile_unauthorized(self):
        """ 
        Test updating public profile without authentication.
        """
        url = reverse('public_profile')
        data = {'showed_name': 'Updated Name'}
        response = self.client.patch(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# Test for API GET Endpoint / get_public_profile
    def test_get_public_profile_success(self):
        """
        Test retrieving a public profile by valid ID.
        """
        url = reverse('get_public_profile')
        response = self.client.get(url, {'id': self.user.public_profile.public_profile_id})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['showed_name'], self.user.public_profile.showed_name)
        self.assertEqual(response.data['description'], self.user.public_profile.description)

    def test_get_public_profile_missing_id(self):
        """
        Test GET request with no ID parameter.
        """
        url = reverse('get_public_profile')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data["detail"], "ID is required.")
    
    def test_get_public_profile_not_found(self):
        """
        Test GET request with an ID that does not exist.
        """
        url = reverse('get_public_profile')
        response = self.client.get(url, {'id': 9999})
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
