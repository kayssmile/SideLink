from .views import RegisteredUserView  
from django.urls import path  


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenBlacklistView,
)

from .views import CustomTokenObtainPairView
from .views import CustomTokenRefreshView


urlpatterns = [  
    path('register/', RegisteredUserView.as_view(), name='registereduser'),

    # Login (gibt Access- und Refresh-Token zurück)
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # Refresh Access-Token mit Refresh-Token
    path('refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    
    # Logout (fügt Refresh-Token der Blacklist hinzu)
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist')
]  