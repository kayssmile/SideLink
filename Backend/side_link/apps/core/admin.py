from django.contrib import admin
from .models import Category, SubCategory, Region, Location, ContactMessage


admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Region)
admin.site.register(Location)
admin.site.register(ContactMessage)


