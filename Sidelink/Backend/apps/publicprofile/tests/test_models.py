import os
import tempfile
from django.test import TestCase, override_settings
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.usermanagment.models import RegisteredUser
from apps.publicprofile.models import PublicProfile

# Use temp directory for media files, avoiding saving files in actual MEDIA_ROOT
@override_settings(MEDIA_ROOT=tempfile.gettempdir())
class PublicProfileModelTests(TestCase):
    def setUp(self):
        """
        Set up fresh user with no public profile.
        """
        self.user = RegisteredUser.objects.create_user(
            email="test@example.com", password="securepass123"
        )
        self.user.public_profile.delete()

    def test_create_public_profile_with_all_fields(self):
        """
        Test creating a PublicProfile with all fields filled.
        """
        image = SimpleUploadedFile("profile.jpg", b"fake image data", content_type="image/jpeg")
        profile = PublicProfile.objects.create(
            user=self.user,
            showed_name="Test Name",
            description="This is a description.",
            contact_info="Contact me at...",
            public_profile_picture=image
        )
        self.assertEqual(profile.user, self.user)
        self.assertEqual(profile.showed_name, "Test Name")
        self.assertEqual(profile.description, "This is a description.")
        self.assertEqual(profile.contact_info, "Contact me at...")
        self.assertTrue(profile.public_profile_picture.name.startswith("public_profile_pictures/"))

    def test_create_public_profile_with_optional_fields_none(self):
        """
        Test creating a PublicProfile with optional fields set to None.
        """
        profile = PublicProfile.objects.create(user=self.user)
        self.assertIsNone(profile.showed_name)
        self.assertIsNone(profile.description)
        self.assertIsNone(profile.contact_info)
        self.assertFalse(profile.public_profile_picture)
    
    def test_str_method(self):
        """
        Test the string representation of the PublicProfile model.
        """
        profile = PublicProfile.objects.create(user=self.user)
        self.assertEqual(str(profile), f"Public Profile {self.user.email}")

    def tearDown(self):
        # Cleanup all files in temp dir
        media_root = tempfile.gettempdir()
        for f in os.listdir(media_root):
            path = os.path.join(media_root, f)
            if os.path.isfile(path):
                os.remove(path)
