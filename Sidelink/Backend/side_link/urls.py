from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include


""" 
URL configuration for the side_link project.

Defines the global URL routing including admin, authentication,
public profile, public services, core, and analytics APIs.
"""
urlpatterns = [
    path('', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    path('admin/', admin.site.urls),
    path('api/', include('apps.core.urls')),
    path('api/auth/', include('apps.usermanagment.urls')),
    path('api/publicprofile/', include('apps.publicprofile.urls')),
    path('api/publicservices/', include('apps.publicservice.urls')),
    path('api/analytics-data/', include('apps.analytics.urls')),
]

if settings.DEBUG:
    # Serve static and media files in development
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    # Add silk URLs for performance monitoring
    urlpatterns += [path("silk/", include("silk.urls", namespace="silk"))]