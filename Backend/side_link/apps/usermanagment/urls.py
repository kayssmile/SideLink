from .views import RegisterUserView  
from django.urls import path  


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
    TokenBlacklistView,
)

from .views import CustomTokenObtainPairView
from .views import CustomTokenRefreshView
from .views import CustomTokenBlacklistView
from .views import RegisteredUserView
from .views import ChangePasswordView


urlpatterns = [  

    path('registereduser/', RegisteredUserView.as_view(), name='registered_user'),

    path('register/', RegisterUserView.as_view(), name='register_user'),

    path('change-password/', ChangePasswordView.as_view(), name='change_password'),

    # Login (gibt Access- und Refresh-Token zurück)
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh Access-Token mit Refresh-Token
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    
    # Token verfication
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Logout (fügt Refresh-Token der Blacklist hinzu)
    path('logout/', CustomTokenBlacklistView.as_view(), name='token_blacklist')
]  