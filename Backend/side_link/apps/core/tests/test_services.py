from rest_framework.exceptions import ValidationError
from unittest.mock import patch, Mock
from django.test import TestCase
from django.test import TestCase
from apps.core.services.db_service import DbService
from apps.core.models import Category, SubCategory, Region, Location
from apps.core.services.email_service import EmailService


# To prevent real logging we mock the logger
@patch('apps.core.services.email_service.logger')
 # to prevent real email sending, we mock the EmailMessage class
@patch('apps.core.services.email_service.EmailMessage')
class EmailServiceTests(TestCase):

    def test_send_email_success(self, mock_send_email_system, mock_logger ):
        """
        Test sending email successfully returns True and loggs success.
        """
        mock_send_email_system = mock_send_email_system.return_value
        mock_send_email_system.send.return_value = 1
        result = EmailService.send_email(to_email=["test1@example.com", "mycustomer@sidelink.ch"], subject="Test Subject", body="Hello World")
        self.assertTrue(result)
        mock_logger.info.assert_called_once()
        log_msg = mock_logger.info.call_args[0][0]
        self.assertIn('Sent email to', log_msg)
        self.assertIn('Test Subject', log_msg)
    
    def test_send_email_failure(self, mock_send_email_system, mock_logger):
        """
        Test sending email fails and logs the error.
        """
        mock_send_email_system = mock_send_email_system.return_value
        mock_send_email_system.send.return_value = 0
        result = EmailService.send_email(to_email=["test1@example.com", "mycustomer@sidelink.ch"], subject="Test Subject", body="Hello World")
        self.assertFalse(result)
        mock_logger.error.assert_called_once()
        log_msg = mock_logger.error.call_args[0][0]
        self.assertIn('Error sending email to', log_msg)
        self.assertIn('Test Subject', log_msg)
    
    def test_send_email_smtp_failure(self, mock_send_email_system, mock_logger):
        """
        Test sending email fails and logs the error.
        """
        mock_send_email_system = mock_send_email_system.return_value
        mock_send_email_system.send.side_effect = Exception("SMTP Error")
        result = EmailService.send_email(to_email=["test1@example.com", "mycustomer@sidelink.ch"], subject="Test Subject", body="Hello World")
        self.assertFalse(result)
        mock_logger.error.assert_called_once()
        log_msg = mock_logger.error.call_args[0][0]
        self.assertIn('SMTP', log_msg)
        self.assertIn('Test Subject', log_msg)    
    
    def test_send_email_missing_params(self, mock_send_email_system, mock_logger):
        """
        Test sending email with missing arguments raises TypeError.
        """
        with self.assertRaises(TypeError):
            EmailService.send_email()  

class DbServiceTests(TestCase):
    def setUp(self):
        fake_request = Mock()
        fake_request.data ={
            "category": "Education",
            "sub_categories": ["Future Online Courses", "Digital Services"],
            "region": "Webiversum",
            "location": "PatchedRoom7"
            }
        self.fake_request = fake_request 

    def test_create_all_new_entries(self):
        """ 
        Test creating all new entries if none exist in the database.
        """
        data = DbService.check_exist_or_create(self.fake_request)
        self.assertIn("category", data)
        self.assertIn("sub_categories", data)
        self.assertIn("region", data)
        self.assertIn("location", data)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(SubCategory.objects.count(), 2)
        self.assertEqual(Region.objects.count(), 1)
        self.assertEqual(Location.objects.count(), 1)

    def test_missing_required_fields(self):
        """
        Test that missing required fields raise ValidationError.
        """
        invalid_request = Mock()
        invalid_request.data = {
            "sub_categories": ["Future Online Courses", "Digital Services"],
            "region": "Webiversum",
            "location": "PatchedRoom7"}

        with self.assertRaises(ValidationError) as context:
            data = DbService.check_exist_or_create(invalid_request)
        self.assertIn("category", str(context.exception.detail))

    def test_existing_entries_are_used(self):
        """
        Test that existing category, subcategory, region, and location not recreated if exists.
        """
        category = Category.objects.create(name="Education")
        categories_count = Category.objects.count()
        category_id_before = category.id
        DbService.check_exist_or_create(self.fake_request)
        category_id_after = Category.objects.get(name="Education").id
        categories_count_after = Category.objects.count()
        self.assertEqual(category_id_before, category_id_after)
        self.assertEqual(categories_count, categories_count_after)
        
    def test_santize_text(self):
        """
        Test that the text is sanitized correctly.
        """
        self.fake_request.data["category"] = "<script>alert('XSS')</script>"
        data = DbService.check_exist_or_create(self.fake_request)
        santized_category = Category.objects.get(id=data["category"])
        self.assertEqual(santized_category.name, "alert('XSS')") 