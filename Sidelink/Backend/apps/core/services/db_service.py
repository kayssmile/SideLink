from rest_framework.exceptions import ValidationError
from apps.core.models import Category, SubCategory, Region, Location
from apps.core.utils.validators import BasicValidators

class DbService:

    def __init__(self, request, required_fields=None):
        """
        Initialize the DbService with request data
        """
        self.data = request.data.copy()
        if required_fields:
            self._validate_required_fields(required_fields)

    def _validate_required_fields(self, required_fields):
        """
        Validate required fields
        """
        missing = [field for field in required_fields if not self.data.get(field)]
        if missing:
            raise ValidationError({field: "This field is required." for field in missing})    

    def _get_or_create_model(self, model_class, lookup_fields, **kwargs):
        """
        Generic helper method to get or create a model instance.
        """
        return model_class.objects.get_or_create(
            **lookup_fields,
            defaults=kwargs
        )

    def check_category(self):
        """
        Check if category exists in the database or create it if not.
        """
        cleaned_category = BasicValidators.validate_basic_text(self.data.get('category'))
        if not cleaned_category:
            raise ValidationError({'category': "This field is required."})
        category, _ = self._get_or_create_model(Category, {'name': cleaned_category,})
        self.data['category'] = category.id

    def check_sub_categories(self):
        """
        Check if sub_categories exist in the database, if not create them.
        """
        if 'category' not in self.data:
            raise ValidationError({'category': "Category must be set before subcategories."})
        sub_categorie_ids = []
        for sub_category in self.data.get('sub_categories', []):
            cleaned_sub_category = BasicValidators.validate_basic_text(sub_category)
            sub_category_instance, _ = self._get_or_create_model(SubCategory, {'name': cleaned_sub_category, 'category_id': self.data['category']})            
            sub_categorie_ids.append(sub_category_instance.id)
        self.data['sub_categories'] = sub_categorie_ids

    def check_region(self):
        """
        Check if region exists in the database, if not create it.
        """
        cleaned_region = BasicValidators.validate_basic_text(self.data.get('region'))
        if not cleaned_region:
            raise ValidationError({'region': "This field is required."})
        region, _ = self._get_or_create_model(Region, {'name': cleaned_region})
        self.data['region'] = region.id

    def check_location(self):
        """
        Check if location exists in the database, if not create it.
        """
        if 'location' not in self.data:
            raise ValidationError({'location': "Location must be set."})
        cleaned_location = BasicValidators.validate_basic_text(self.data.get('location'))
        if not cleaned_location:
            raise ValidationError({'location': "This field is required."})
        location, _ = self._get_or_create_model(Location, {'name': cleaned_location, 'region_id': self.data['region']})
        self.data['location'] = location.id

    def check_all(self):
        """
        Check fields: category, sub_categories, region, and location, and return the updated data
        """
        try:
            self.check_category()
            self.check_sub_categories()
            self.check_region()
            self.check_location()
            return self.data
        except ValidationError:
            raise
        except Exception as e:
            raise ValidationError({'error': f"An unexpected error occurred: {str(e)}"})