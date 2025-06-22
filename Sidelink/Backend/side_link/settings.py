"""
Django settings for side_link project.
"""
from pathlib import Path
from datetime import timedelta
import os


BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = 'django-insecure-5^avpma0u=ii+t%xrpoe5^xm=(cvkgk6n4p7z^1#1o^xqb-$m*'
DEBUG = True
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "").split()
CLIENT_URL = os.environ.get("CLIENT_URL", "http://localhost:5173")

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'drf_spectacular',
    'apps.core',
    'apps.usermanagment',
    'apps.publicservice',
    'apps.publicprofile',
    'apps.analytics',
]
if DEBUG:
    INSTALLED_APPS += ["silk"]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

SPECTACULAR_SETTINGS = {
    'TITLE': 'SideLink API',
    'DESCRIPTION': 'Documentation for the SideLink API',
    'VERSION': 'not versioned',
    'SERVE_INCLUDE_SCHEMA': False,
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=45),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=3), #timedelta(minutes=1), 
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]
if DEBUG:
    MIDDLEWARE += ["silk.middleware.SilkyMiddleware"]

CORS_ALLOW_ALL_ORIGINS = False
CORS_ALLOW_CREDENTIALS = True

CORS_ALLOWED_ORIGINS = [
   os.environ.get("CLIENT_URL", "http://localhost:5173")
]

CORS_ALLOW_METHODS = ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"]
CORS_ALLOW_HEADERS = [
    "Authorization",
    "Content-Type",
    "X-CSRFToken", 
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin",
    "Access-Control-Allow-Methods",
    "Access-Control-Allow-Credentials",
]

# Cookie settings
CSRF_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_SECURE = True

CSRF_TRUSTED_ORIGINS = [
    os.environ.get("CLIENT_URL", "http://localhost:5173")
]

ROOT_URLCONF = 'side_link.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'side_link.wsgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE': os.environ.get('SQL_ENGINE', 'django.db.backends.postgresql'),
        'NAME': os.environ.get('SQL_DATABASE', 'side_link_db'),
        'USER': os.environ.get('SQL_USER', 'admin'),
        'PASSWORD': os.environ.get('SQL_PASSWORD', 'secretpassword'),
        'HOST': os.environ.get('SQL_HOST', 'db'),
        'PORT': os.environ.get('SQL_PORT', '5432'),
    }
}

# Password validation
# Custom validators from apps.core.utils.validators
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
     {
        'NAME': 'apps.core.utils.validators.MinimumLengthValidator',
    },
    {
        'NAME': 'apps.core.utils.validators.UppercaseValidator',
    },
    {
        'NAME': 'apps.core.utils.validators.SpecialCharacterValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Zurich'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/api_static/'
STATIC_ROOT = '/srv/app/static'

MEDIA_URL = '/api_media/'
MEDIA_ROOT = '/srv/app/media'

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
AUTH_USER_MODEL = 'usermanagment.RegisteredUser'

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_CONSOLE_FORMAT = '=== EMAIL KONSOLE (DEV) ===\n\n{email}\n\n=== END ==='
ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL', 'admin@sidelink.ch')
DEFAULT_FROM_EMAIL = os.environ.get('DEFAULT_FROM_EMAIL', 'noreply@sidelink.ch')

# Customized logging configuration for Django and email-service
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file_error': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': 'logs/django_errors.log',
            'formatter': 'verbose',
        },
        'file_email': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'logs/email_service.log',
            'formatter': 'verbose',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file_error', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
        'email_service': { 
            'handlers': ['file_email', 'console'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}