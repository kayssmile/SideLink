from django.urls import path  
from .views import PublicServicesView

urlpatterns = [  
    path('publicservices/', PublicServicesView.as_view(), name='public_services'),
]