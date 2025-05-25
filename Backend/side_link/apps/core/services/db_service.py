from rest_framework.exceptions import ValidationError
from apps.core.models import Category, SubCategory, Region, Location
from apps.core.utils.validators import BasicValidators

class DbService:
   
    @staticmethod
    def check_exist_or_create(request):
        ''' 
        Check if category, sub_category, region, and location exist in the database, if not create them.
        '''
        data = request.data.copy()
        required_fields = ['category', 'region', 'location']
        missing = [field for field in required_fields if not data.get(field)]
        if missing:
            raise ValidationError({field: "This field is required." for field in missing})
        cleaned_category = BasicValidators.validate_basic_text(request.data.get('category'))
        category, _ = Category.objects.get_or_create(name=cleaned_category)
        data['category'] = category.id
        sub_categorie_ids = []
        for sub_category in request.data.get('sub_categories', []):
            sub_category = BasicValidators.validate_basic_text(sub_category)
            sub_category_instance, _ = SubCategory.objects.get_or_create(name=sub_category, category=category)
            sub_categorie_ids.append(sub_category_instance.id)
        data['sub_categories'] = sub_categorie_ids
        cleaned_region = BasicValidators.validate_basic_text(request.data.get('region'))
        region, _ = Region.objects.get_or_create(name=cleaned_region)
        data['region'] = region.id
        cleaned_region = BasicValidators.validate_basic_text(request.data.get('location'))
        location, _ = Location.objects.get_or_create(name=cleaned_region, region=region)
        data['location'] = location.id
        return data