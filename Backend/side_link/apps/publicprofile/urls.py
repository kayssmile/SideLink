from .views import PublicProfileView, get_public_profile
from django.urls import path  
  
urlpatterns = [  
    path('publicprofile/', PublicProfileView.as_view(), name='public_profile'),
    path('publicprofile/get/', get_public_profile, name='get_public_profile'),
]