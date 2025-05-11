# System libraries


# Third-party libraries


# Django modules
from django.urls import path  

# Django apps


# Current-app modules
from .views import AnalyticsData

urlpatterns = [  
    path('analytics-data/', AnalyticsData.as_view(), name='analytics_data'),
]  