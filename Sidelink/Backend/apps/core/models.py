import html
from django.db import models


class TimestampMixin(models.Model):
    """
    Abstract base model that adds created_at and updated_at timestamps to a model.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Category(TimestampMixin, models.Model):
    """
    Model representing a category.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    keywords = models.JSONField(default=list)
    
    def __str__(self):
        return html.unescape(self.name)

class SubCategory(TimestampMixin, models.Model):
    """
    Model representing a sub-category that belongs to a category.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    keywords = models.JSONField(default=list)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sub_categories') 

    def __str__(self):
        return html.unescape(self.name)
    
class Region(TimestampMixin, models.Model):
    """
    Model representing a region.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name    
    
class Location(TimestampMixin, models.Model):
    """
    Model representing a location that belongs to a region.
    """
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name='locations') 

    def __str__(self):
        return self.name
    
class ContactMessage(TimestampMixin, models.Model):
    """
    Model representing a contact/support message sent by a user.
    """
    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=200)
    last_name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()

    def __str__(self):
        return self.subject
