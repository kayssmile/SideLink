from django.db import models
from apps.core.models import TimestampMixin

class AnalyticsDataEntry(TimestampMixin, models.Model):
    """
    Model for storing analytics data.
    Prepared for further trackings.
    """
    id = models.AutoField(primary_key=True)
    page_visit = models.BooleanField(default=True)
   
    def __str__(self):
        return 'Page Visit Entry'