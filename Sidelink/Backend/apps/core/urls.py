from django.urls import path  
from .views import UserDashboardData, get_public_data, process_message

""" 
URL configuration for the core app.
Defines routes for user dashboard data, public data retrieval, and contact message processing.
"""
urlpatterns = [  
    path('dashboard-data/', UserDashboardData.as_view(), name='dashboard_data'),
    path('public-data/', get_public_data, name='public_data'),
    path('contact-message/', process_message, name='contact_message'),
]  