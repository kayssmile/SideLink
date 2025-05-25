from django.urls import path  
from .views import AnalyticsData, create_analytics_data

""" 
URL configuration for the analytics app.
"""
urlpatterns = [  
    path('', AnalyticsData.as_view(), name='analytics_data'),
    path('create/', create_analytics_data, name='create_analytics_data_entry'),
]  