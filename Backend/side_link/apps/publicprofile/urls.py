from django.urls import path
from .views import PublicProfileView, get_public_profile
""" 
Defines urls for the publicprofile API.
"""  
urlpatterns = [  
    path('', PublicProfileView.as_view(), name='public_profile'),
    path('get/', get_public_profile, name='get_public_profile'),
]