from django.test import TestCase
from apps.core.models import Category, SubCategory, Region, Location, ContactMessage


class CoreModelTests(TestCase):
    def setUp(self):
        """
        Create shared test data for related models.
        """
        self.category = Category.objects.create(name="Health", keywords=["wellness", "fitness"])
        self.subcategory = SubCategory.objects.create(name="Yoga", category=self.category, keywords=["stretching"])
        self.region = Region.objects.create(name="Berne")
        self.location = Location.objects.create(name="Buxi", region=self.region)
        self.contact_message = ContactMessage.objects.create(
            first_name="DJane",
            last_name="admit",
            email="jane.doe@example.com",
            subject="Test Subject",
            message="Test message content."
        )

    def test_category_exists(self):
        """
        Test that a Category instance can be created and exists in the database.
        """
        self.assertTrue(Category.objects.filter(name=self.category.name).exists())

    def test_category_str(self):
        """
        Test the string representation of a Category instance.
        """
        self.assertEqual(str(self.category), "Health")

    def test_subcategory_str_and_relation(self):
        """
        Test the string representation and relation of a SubCategory instance.
        """
        self.assertEqual(str(self.subcategory), "Yoga")
        self.assertEqual(self.subcategory.category, self.category)
        self.assertIn(self.subcategory, self.category.sub_categories.all())

    def test_region_str(self):
        """
        Test the string representation of a Region instance.
        """
        self.assertEqual(str(self.region), "Berne")

    def test_location_str_and_relation(self):
        """
        Test the string representation and relation of a Location instance.
        """
        self.assertEqual(str(self.location), "Buxi")
        self.assertEqual(self.location.region, self.region)
        self.assertIn(self.location, self.region.locations.all())

    def test_contact_message_creation_and_fields(self):
        """
        Test the creation and field values of a ContactMessage instance.
        """
        self.assertEqual(self.contact_message.first_name, "DJane")
        self.assertEqual(self.contact_message.last_name, "admit")
        self.assertEqual(self.contact_message.email, "jane.doe@example.com")
        self.assertEqual(self.contact_message.subject, "Test Subject")
        self.assertEqual(self.contact_message.message, "Test message content.")
        self.assertEqual(str(self.contact_message), "Test Subject")

class CoreTimeStampMixinTests(TestCase):
    """
    Test the TimestampMixin abstract model.
    This ensures that all models inheriting from TimestampMixin
    have created_at and updated_at fields.
    """
    def test_timestamp_mixin_fields(self):
        """
        Test that models inheriting from TimestampMixin have created_at and updated_at fields.
        """
        category = Category.objects.create(name="Test Category")
        self.assertTrue(hasattr(category, 'created_at'))
        self.assertTrue(hasattr(category, 'updated_at'))
        self.assertIsNotNone(category.created_at)
        self.assertIsNotNone(category.updated_at)