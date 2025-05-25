from django.test import TestCase
from apps.core.models import Category, SubCategory, Region, Location
from apps.usermanagment.models import RegisteredUser
from apps.publicservice.serializers import PublicServiceSerializer, SubCategorySerializer


class PublicServiceSerializerTests(TestCase):
    def setUp(self):
        """
        Set up test-data for PublicServiceSerializer tests.
        This includes creating a test user, category, subcategory, region, and location.
        """
        self.user = RegisteredUser.objects.create_user(email="test@example.com", password="testpass123")
        self.category = Category.objects.create(name="Test Category")
        self.sub1 = SubCategory.objects.create(name="Sub 1", category=self.category)
        self.sub2 = SubCategory.objects.create(name="Sub 2", category=self.category)
        self.region = Region.objects.create(name="Test Region")
        self.location = Location.objects.create(name="Test Location", region=self.region)

        self.valid_data = {
            "title": "Test Service",
            "description": "Test Description",
            "user": self.user.id,
            "public_profile_id": self.user.public_profile.public_profile_id,
            "category": self.category.id,
            "sub_categories": [self.sub1.id, self.sub2.id],
            "region": self.region.id,
            "location": self.location.id
        }

    def test_valid_data_creates_public_service(self):
        """
        Test the serializer creates a PublicService instance with valid input.
        """
        serializer = PublicServiceSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        self.assertEqual(instance.title, "Test Service")
        self.assertEqual(instance.sub_categories.count(), 2)
        self.assertEqual(instance.category, self.category)
        self.assertIn(self.sub1, instance.sub_categories.all())

    def test_missing_required_fields(self):
        """
        Test serializer raises error when required fields are missing.
        """
        invalid_data = self.valid_data.copy()
        invalid_data.pop("title")
        serializer = PublicServiceSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)

    def test_dangerous_fields(self):
        """
        Test serializer raises error when fields contains dangerous data.
        """
        invalid_data = self.valid_data.copy()
        invalid_data["title"] = "<script>alert('XSS')</script>"
        serializer = PublicServiceSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("title", serializer.errors)    

    def test_read_only_fields_in_output(self):
        """
        Test that the read-only detail-fields are included in serialized output.
        """
        serializer = PublicServiceSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        public_service = serializer.save()
        output_serializer = PublicServiceSerializer(public_service)
        output = output_serializer.data
        self.assertIn("category_details", output)
        self.assertIn("sub_categories_details", output)
        self.assertIn("region_details", output)
        self.assertIn("location_details", output)
        self.assertEqual(output["category_details"], "Test Category")
        self.assertEqual(output["region_details"], "Test Region")
        self.assertEqual(output["location_details"], "Test Location")
        self.assertEqual(len(output["sub_categories_details"]), 2)
        self.assertEqual(output["sub_categories_details"][0]["name"], "Sub 1")
            
    
class SubCategorySerializerTest(TestCase):
    def setUp(self):
        """
        Set up test data for SubCategorySerializer tests.
        This includes creating a test category and subcategory.
        """
        self.category = Category.objects.create(name="Test Category")
        self.subcategory = SubCategory.objects.create(name="Test Subcategory", category=self.category)
    
    def test_subcategory_serializer(self):
        """
        Test that the SubCategorySerializer correctly serializes a SubCategory instance.
        """
        serializer = SubCategorySerializer(self.subcategory)
        data = serializer.data
        self.assertEqual(data["id"], self.subcategory.id)
        self.assertEqual(data["name"], self.subcategory.name)

    def test_subcategory_serializer_invalid(self):
        """
        Test that the SubCategorySerializer raises an error when invalid data is provided.
        """
        invalid_data = {
            "name": ""
        }
        serializer = SubCategorySerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)        