from apps.core.models import Category, SubCategory, Region, Location

def check_exist_or_create(request):
    ''' 
    Check if the category, sub_category, region, and location exist in the database, if not create them.
    '''
    data = request.data.copy()
    category, _ = Category.objects.get_or_create(name=request.data.get('category'))
    data['category'] = category.id
    
    sub_categorie_ids = []
    for sub_category in request.data.get('sub_categories', []):
        sub_category_instance, _ = SubCategory.objects.get_or_create(name=sub_category, category=category)
        sub_categorie_ids.append(sub_category_instance.id)
    data['sub_categories'] = sub_categorie_ids
    
    region, _ = Region.objects.get_or_create(name=request.data.get('region'))
    data['region'] = region.id

    location, _ = Location.objects.get_or_create(name=request.data.get('location'), region=region)
    data['location'] = location.id
    
    return data