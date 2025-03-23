from django.db import models
from apps.core.models import TimestampMixin

class PublicProfile(TimestampMixin, models.Model):
    public_profile_id = models.AutoField(primary_key=True)
    user = models.OneToOneField(
        'usermanagment.RegisteredUser',
        on_delete=models.CASCADE,
    )
    
    username = models.CharField(max_length=250, null=True)
    description = models.TextField(null=True)
    contact_info = models.TextField(null=True)
    public_profile_picture = models.ImageField(upload_to='public_profile_pictures/', null=True)
    
    def __str__(self):
        return f'Public Profile {self.user.email}'
