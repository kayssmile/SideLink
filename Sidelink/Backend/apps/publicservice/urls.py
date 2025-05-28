from django.urls import path  
from .views import PublicServiceView
""" 
Defines routes for the publicservice API.
"""
urlpatterns = [  
    path('', PublicServiceView.as_view(), name='public_service'),
]