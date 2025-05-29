from rest_framework.test import APITestCase
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.urls import reverse
from apps.usermanagment.models import RegisteredUser
from apps.publicservice.models import PublicService


class PublicServiceViewTests(APITestCase):
    def setUp(self):
        """
        Set up a test user and generate a JWT access token for authentication.
        Also set the base URL for public service API endpoints.
        """
        self.user = RegisteredUser.objects.create_user(
            email='user@example.com',
            password='testpass123'
        )
        self.token = RefreshToken.for_user(self.user).access_token
        self.url = reverse('public_service')

    def test_create_public_service(self):
        """ Test creating a public service with all required and optional fields."""
        data = {
            "title": "Test Service",
            "description": "Test Beschreibung",
            "category": 'Test Category',
            "sub_categories": ['1cat', '2cat'],
            "region": '1reg',
            "location": '1loc',
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PublicService.objects.count(), 1)
        self.assertEqual(response.data["title"], "Test Service")
    
    def test_create_public_service_missing_fields(self):
        """ Test creating a public service while omitting the 'location' field."""
        data = {
            "title": "Test Service",
            "description": "Test Beschreibung",
            "category": 'Test Category',
            "sub_categories": ['1cat', '2cat'],
            "region": '1reg',
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("location", response.data)

    def test_create_public_service_missing_required_field(self):
        """ Test creating a public service without the required 'title' field. """
        data = {
            "description": "Test Beschreibung",
            "category": 'Test Category',
            "sub_categories": ['1cat', '2cat'],
            "region": '1reg',
            "location": '1loc',
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("title", response.data)  

    def test_create_public_service_without_subcategories(self):
        """ Test creating a public service without providing any subcategories."""
        data = {
            "title": "Test Service",
            "description": "Test Beschreibung",
            "category": 'Test Category',
            "region": '1reg',
            "location": '1loc',
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(PublicService.objects.count(), 1)
        self.assertEqual(response.data["title"], "Test Service")   
        
    def test_create_public_service_invalid_token(self):
        """ Test creating a public service with an invalid JWT token. """
        data = {
            "title": "Test Service",
            "description": "Test Beschreibung",
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer undefined')
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_delete_public_service(self):
        """ Test deleting an existing public service using its ID."""
        public_service = PublicService.objects.create(
            title="Delete Me",
            description="Test",
            user=self.user,
            public_profile_id=self.user.public_profile
        )
        url_with_id = self.url + f"?id={public_service.id}"
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.delete(url_with_id)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(PublicService.objects.count(), 0)

    def test_delete_public_service_missing_id(self):
        """ Test deleting a public service without providing the ID."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST) 
        self.assertEqual(response.data["detail"], "ID is required")  
    
    def test_delete_public_service_no_exist_public_service(self):
        """ Test deleting a public service with an ID that doesn't exist."""
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.delete(self.url + "?id=9999")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "Public service not found")
    
    def test_put_public_service(self):
        """ Test updating an existing public service with new data."""
        public_service = PublicService.objects.create(
            title="Old Title",
            description="Old Desc",
            user=self.user,
            public_profile_id=self.user.public_profile
        )
        data = {
            "title": "New Title",
            "description": "New Desc",
            "category": 'Test Category',
            "sub_categories": ['2cat', '2cat'],
            "region": '1reg',
            "location": '1loc',
            "public_service_id": public_service.id
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "New Title")
        self.assertEqual(response.data['description'], "New Desc")
        self.assertEqual(response.data['sub_categories_details'][0]['name'], "2cat")
        
    def test_put_public_service_missing_id(self):
        """ Test updating a public service without providing the ID. """
        data = {
            "title": "New Title",
            "description": "New Desc",
            "category": 'Test Category',
            "sub_categories": ['2cat', '2cat'],
            "region": '1reg',
            "location": '1loc',
        }
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {self.token}')
        response = self.client.put(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertEqual(response.data["detail"], "Public service not found")