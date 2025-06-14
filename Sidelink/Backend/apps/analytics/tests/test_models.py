from django.test import TestCase
from apps.analytics.models import AnalyticsDataEntry


class CoreModelTests(TestCase):
    def setUp(self):
        """
        Create a analtics data entry.
        """
        self.analytics_entry = AnalyticsDataEntry.objects.create(page_visit=True)
        
    def test_entry_exists(self):
        """
        Test that a entry exists in the database.
        """
        self.assertTrue(AnalyticsDataEntry.objects.count() > 0)

    def test_category_str(self):
        """
        Test the string representation of a analytics-data-entry instance.
        """
        self.assertEqual(str(self.analytics_entry), "Page Visit Entry")

 