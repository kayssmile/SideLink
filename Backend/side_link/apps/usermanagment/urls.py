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
from .views import RegisteredUser


urlpatterns = [  

    path('registereduser/', RegisteredUser.as_view(), name='registered_user'),

    path('register/', RegisterUserView.as_view(), name='register_user'),

    # Login (gibt Access- und Refresh-Token zurück)
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh Access-Token mit Refresh-Token
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    
    path('verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Logout (fügt Refresh-Token der Blacklist hinzu)
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist')
]  