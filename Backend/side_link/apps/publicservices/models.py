from django.db import models
from apps.core.models import TimestampMixin

# Create your models here.
class PublicService(TimestampMixin, models.Model):
    id = models.AutoField(primary_key=True)
    service_type_choices = { 'offer':'Offer', 'search':'Search', 'na':'Not Available' }
    service_type = models.CharField(max_length=6, choices=service_type_choices.items(), default='na')
    category = models.ForeignKey('core.Category', on_delete=models.SET_NULL, null=True, related_name='public_services')
    sub_categories = models.ManyToManyField('core.SubCategory', related_name='public_services')
    region = models.ForeignKey('core.Region', on_delete=models.SET_NULL, null=True, related_name='public_services')
    location = models.ForeignKey('core.Location', on_delete=models.SET_NULL, null=True, related_name='public_services')
    additional_location_info = models.CharField(max_length=350, blank=True, null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    user = models.ForeignKey('usermanagment.RegisteredUser', on_delete=models.CASCADE, related_name='public_services')
    public_profile_id = models.ForeignKey('publicprofile.PublicProfile', on_delete=models.CASCADE, related_name='public_services')
    
    def __str__(self):
        return self.title