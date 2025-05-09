# System libraries


# Third-party libraries


# Django modules
from django.urls import path  

# Django apps


# Current-app modules
from .views import UserDashboardData, get_public_data, process_message


urlpatterns = [  

    path('dashboard-data/', UserDashboardData.as_view(), name='dashboard_data'),
    path('public-data/', get_public_data, name='public_data'),
    path('contact-message/', process_message, name='contact_message'),

]  