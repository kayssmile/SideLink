from django.db import models

# Create your models here.
class TimestampMixin(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Category(TimestampMixin, models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    keywords = models.JSONField(default=list)
    
    def __str__(self):
        return self.name

class SubCategory(TimestampMixin, models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    keywords = models.JSONField(default=list)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='sub_categories')
    
    def __str__(self):
        return self.name
    
class Region(TimestampMixin, models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    locations = models.ManyToManyField('core.Location', related_name='regions')
    def __str__(self):
        return self.name    
    
class Location(TimestampMixin, models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name='locations_set')
    
    def __str__(self):
        return self.name
