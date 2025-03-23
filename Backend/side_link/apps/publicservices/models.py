from django.db import models
from apps.core.models import TimestampMixin

# Create your models here.
class PublicService(TimestampMixin, models.Model):
    id = models.AutoField(primary_key=True)

    categories = models.ManyToManyField('core.Category', related_name='public_services')
    sub_categories = models.ManyToManyField('core.SubCategory', related_name='public_services')
    region = models.ForeignKey('core.Region', on_delete=models.SET_NULL, null=True, related_name='public_services')
    location = models.ForeignKey('core.Location', on_delete=models.SET_NULL, null=True, related_name='public_services')
    title = models.CharField(max_length=200)
    description = models.TextField()
    user_id = models.ForeignKey('usermanagment.RegisteredUser', on_delete=models.CASCADE, related_name='public_services')
    public_profile_id = models.ForeignKey('publicprofile.PublicProfile', on_delete=models.CASCADE, related_name='public_services')
    
    def __str__(self):
        return self.name