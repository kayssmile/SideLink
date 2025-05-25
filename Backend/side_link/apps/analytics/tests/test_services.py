from datetime import timedelta
from django.test import TestCase
from django.utils import timezone
from apps.core.models import Category, Region
from apps.publicservice.models import PublicService
from apps.usermanagment.models import RegisteredUser
from apps.analytics.models import AnalyticsDataEntry
from apps.analytics.services.data_provider import DataProvider


class DataProviderTests(TestCase):
    def setUp(self):
        """
        Set up test data for DataProvider tests.
        """
        self.category1 = Category.objects.create(name="Gesundheit")
        self.category2 = Category.objects.create(name="Bildung")
        self.region1 = Region.objects.create(name="Bern")
        self.region2 = Region.objects.create(name="St.Gallen")
        self.user1 = RegisteredUser.objects.create(email="a@test.ch")
        self.user2 = RegisteredUser.objects.create(email="b@test.ch")
        self.user3 = RegisteredUser.objects.create(email="c@test.ch")
        PublicService.objects.create(category=self.category1, region=self.region1, service_type="offer", user=self.user1, public_profile_id=self.user1.public_profile)
        PublicService.objects.create(category=self.category2, region=self.region2, service_type="search", user=self.user2, public_profile_id=self.user2.public_profile)
        AnalyticsDataEntry.objects.create()
        AnalyticsDataEntry.objects.create()
        self.provider = DataProvider()

    def test_get_all_offers_per_category(self):
        """
        Test that the DataProvider returns the correct count of offers per category upon test setup.
        """
        result = self.provider.get_all_offers_per_category()
        self.assertEqual(result, {"Gesundheit": 1})

    def test_get_all_offers_per_category_no_offers(self):
        """
        Test that the DataProvider returns an empty dictionary
        """
        PublicService.objects.filter(service_type="offer").delete()
        result = self.provider.get_all_offers_per_category()
        self.assertEqual(result, {})    

    def test_get_all_searches_per_category(self):
        """
        Test that the DataProvider returns the correct count of searches per category upon test setup.
        """
        result = self.provider.get_all_searches_per_category()
        self.assertEqual(result, {"Bildung": 1})

    def test_get_all_searches_per_category_no_searches(self):
        """
        Test that the DataProvider returns an empty dictionary
        """
        PublicService.objects.filter(service_type="search").delete()
        result = self.provider.get_all_searches_per_category()
        self.assertEqual(result, {})    

    def test_get_all_offers_per_region(self):
        """
        Test that the DataProvider returns the correct count of offers per region upon test setup.
        """
        result = self.provider.get_all_offers_per_region()
        self.assertEqual(result, {"Bern": 1})

    def test_get_all_offers_per_region_no_offers(self):
        """
        Test that the DataProvider returns an empty dictionary
        """
        PublicService.objects.filter(service_type="offer").delete()
        result = self.provider.get_all_offers_per_region()
        self.assertEqual(result, {})    

    def test_get_all_searches_per_region(self):
        """
        Test that the DataProvider returns the correct count of searches per region upon test setup.
        """
        result = self.provider.get_all_searches_per_region()
        self.assertEqual(result, {"St.Gallen": 1})

    def test_get_all_searches_per_region_no_searches(self):
        """
        Test that the DataProvider returns an empty dictionary
        """
        PublicService.objects.filter(service_type="search").delete()
        result = self.provider.get_all_searches_per_region()
        self.assertEqual(result, {})    

    def test_get_all_registrations_per_month_and_year(self):
        """
        Test that the DataProvider returns the correct registration statistics grouped by year and month.
        """
        self.user1.updated_at = timezone.now()
        self.user1.save()
        RegisteredUser.objects.filter(id=self.user2.id).update(updated_at=timezone.now() - timedelta(days=365))
        result = self.provider.get_all_registrations_per_month_and_year()
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]['year'], 2024)
        self.assertEqual(result[1]['year'], 2025)
        self.assertEqual(result[0]['total'], 1)
        self.assertEqual(result[1]['total'], 2)
        self.assertIn('Mai', result[0]['months'])
        self.assertIn('Mai', result[1]['months'])
        self.assertEqual(result[0]['months']['Mai'], 1)
        self.assertEqual(result[1]['months']['Mai'], 2)
    
    def test_get_all_registrations_per_month_and_year_no_registrations(self):
        """
        Test that the DataProvider returns an empty list.
        """
        RegisteredUser.objects.all().delete()
        result = self.provider.get_all_registrations_per_month_and_year()
        self.assertEqual(result, [])    

    def test_get_all_registrations_without_search_and_offer(self):
        """
        Test that the DataProvider returns the correct count based upon test setup.
        """
        result = self.provider.get_all_registrations_without_search_and_offer()
        self.assertEqual(result, 1)

    def test_get_all_registrations_without_search_and_offer_no_users(self):
        """
        Test that the DataProvider returns zero when there are no registered users.
        """
        RegisteredUser.objects.all().delete()
        result = self.provider.get_all_registrations_without_search_and_offer()
        self.assertEqual(result, 0)    

    def test_get_conversation_rate_registrations(self):
        """
        Test that the DataProvider calculates the conversation rate correctly based on test setup."""
        # 2 visits, 3 users → Rate: 150%
        result = self.provider.get_conversation_rate_registrations()
        self.assertEqual(result, round((3 / 2) * 100, 3))

    def test_get_conversation_rate_with_zero_registrations(self):
        """
        Test that the DataProvider returns zero when there are no registered users.
        """
        RegisteredUser.objects.all().delete()
        result = self.provider.get_conversation_rate_registrations()
        self.assertEqual(result, 0.0)