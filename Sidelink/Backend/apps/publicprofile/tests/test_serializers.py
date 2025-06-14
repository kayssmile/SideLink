import os
import tempfile
from django.test import override_settings
from django.conf import settings
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from apps.usermanagment.models import RegisteredUser
from apps.publicprofile.serializers import PublicProfileSerializer

# We use temporary directory for media files in tests
@override_settings(MEDIA_ROOT=tempfile.gettempdir())
class PublicProfileSerializerTests(TestCase):
    def setUp(self):
        """
        Set up test data for PublicProfileSerializer tests.
        Creates a RegisteredUser with dummy content in public_profile.
        """
        self.user = RegisteredUser.objects.create_user(email="test@example.com", password="testpass123")
        self.user.public_profile.showed_name = "Test User"
        self.user.public_profile.description = "Test description"
        self.user.public_profile.contact_info = "Contact info"
        self.user.public_profile.save()
        self.valid_data = {
            "showed_name": "Updated Name",
            "description": "Updated description.",
            "contact_info": "Updated contact",
        }

    def get_test_image_file(self, filename):
        path = os.path.join(settings.BASE_DIR, "apps/publicprofile/tests/test_images", filename)
        with open(path, "rb") as f:
            return SimpleUploadedFile(name=filename, content=f.read(), content_type="image/png")

    def test_valid_data_updates_public_profile(self):
        """
        Test that the serializer updates the PublicProfile with valid input.
        """
        serializer = PublicProfileSerializer(self.user.public_profile, data=self.valid_data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        self.assertEqual(instance.showed_name, "Updated Name")
        self.assertEqual(instance.description, "Updated description.")

    def test_create_public_profile(self):
        """
        Test that the serializer can create a new PublicProfile.
        """
        # System creates public_profile automatically, so we need to delete it first
        self.user.public_profile.delete()
        data = {
            "user": self.user.id,
            "showed_name": "Maybe Nickname",
            "description": "New description",
            "contact_info": "New contact",
        }
        serializer = PublicProfileSerializer(data=data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        self.assertEqual(instance.showed_name, "Maybe Nickname")

    def test_serializer_rejects_missing_user(self):
        """
        Ensure serializer does not allow creation of a PublicProfile without a user.
        """
        data = {
            "showed_name": "Name",
            "description": "Desc",
            "contact_info": "Contact",
        }
        serializer = PublicProfileSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("user", serializer.errors)

    def test_xss_validation_fails(self):
        """
        Test serializer raises error when fields contains dangerous data.
        """
        malicious_data = {
            "showed_name": "<script>alert(1)</script>",
            "description": "Test",
            "contact_info": "XSS",
        }
        serializer = PublicProfileSerializer(self.user.public_profile, data=malicious_data, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn("showed_name", serializer.errors)

    def test_upload_valid_image(self):
        """
        Test serializer accepts valid image upload.
        """
        valid_image = self.get_test_image_file("valid.png")
        new_data = self.valid_data.copy()
        new_data["public_profile_picture"] = valid_image
        serializer = PublicProfileSerializer(self.user.public_profile, data=new_data, partial=True)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        instance = serializer.save()
        print(instance.public_profile_picture)
        self.assertIn("valid", instance.public_profile_picture.name)

    def test_upload_oversized_image(self):
        """
        Test serializer raises error when image is too large.
        """
        valid_image = self.get_test_image_file("6mb.png")
        new_data = self.valid_data.copy()
        new_data["public_profile_picture"] = valid_image
        serializer = PublicProfileSerializer(self.user.public_profile, data=new_data, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn("public_profile_picture", serializer.errors)
        self.assertIn("Image may not be larger than 5 MB.", serializer.errors["public_profile_picture"][0])

    def test_upload_invalid_image(self):
        """
        Test serializer raises error when falsy image is uploaded.
        """
        invalid_image = SimpleUploadedFile("invalid.txt", b"Not an image")
        new_data = self.valid_data.copy()
        new_data["public_profile_picture"] = invalid_image
        serializer = PublicProfileSerializer(self.user.public_profile, data=new_data, partial=True)
        self.assertFalse(serializer.is_valid())
        self.assertIn("public_profile_picture", serializer.errors)
        self.assertIn("Upload a valid image.", serializer.errors["public_profile_picture"][0])

    def tearDown(self):
        # Cleanup all files in tempporary direcoty
        media_root = tempfile.gettempdir()
        for f in os.listdir(media_root):
            path = os.path.join(media_root, f)
            if os.path.isfile(path):
                os.remove(path)