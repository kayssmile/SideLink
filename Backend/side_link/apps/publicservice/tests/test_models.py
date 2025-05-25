from django.test import TestCase
from apps.publicservice.models import PublicService
from apps.core.models import Category, SubCategory, Region, Location
from apps.usermanagment.models import RegisteredUser


class PublicServiceModelTests(TestCase):
    def setUp(self):
        """
        Set up required related model instances for use in tests.
        """
        self.user = RegisteredUser.objects.create_user(
            email='user@example.com',
            password='testpass123'
        )
        self.public_profile_id=self.user.public_profile
        self.category = Category.objects.create(name="Test Category")
        self.region = Region.objects.create(name="Test Region")
        self.location = Location.objects.create(name="Test Location", region=self.region)
        self.subcat1 = SubCategory.objects.create(name="Subcat 1", category=self.category)
        self.subcat2 = SubCategory.objects.create(name="Subcat 2", category=self.category)

    def test_create_public_service(self):
        """
        Test that a PublicService instance can be created with all required fields.
        """
        new_service = PublicService.objects.create(
            title="Test Title",
            description="Test Description",
            service_type='offer',
            is_active=True,
            category=self.category,
            region=self.region,
            location=self.location,
            user=self.user,
            public_profile_id=self.public_profile_id
        )
        new_service.sub_categories.set([self.subcat1, self.subcat2])
        self.assertEqual(PublicService.objects.count(), 1)
        self.assertEqual(new_service.title, "Test Title")
        self.assertTrue(new_service.is_active)
        self.assertEqual(new_service.category, self.category)
        self.assertIn(self.subcat1, new_service.sub_categories.all())
        self.assertIn(self.subcat2, new_service.sub_categories.all())

    def test_default_service_type(self):
        """
        Test that the default value for service_type is 'na'.
        """
        service = PublicService.objects.create(
            title="Default Service Type",
            description="Test",
            category=self.category,
            region=self.region,
            location=self.location,
            user=self.user,
            public_profile_id=self.public_profile_id
        )
        self.assertEqual(service.service_type, 'na')

    def test_string_representation(self):
        """
        Test the string representation of a PublicService instance returns the title.
        """
        service = PublicService.objects.create(
            title="String Test",
            description="Some description",
            category=self.category,
            region=self.region,
            location=self.location,
            user=self.user,
            public_profile_id=self.public_profile_id
        )
        self.assertEqual(str(service), "String Test")

    def test_null_fields_optional(self):
        """
        Test that optional fields can be left null or blank without raising errors.
        """
        service = PublicService.objects.create(
            title="Optional Fields",
            description="No extra info",
            user=self.user,
            additional_location_info=None,
            public_profile_id=self.public_profile_id
        )
        self.assertIsNone(service.additional_location_info)
