from .views import PublicProfileView  
from django.urls import path  
  
  
urlpatterns = [  
    path('publicprofile/', PublicProfileView.as_view())  
]  