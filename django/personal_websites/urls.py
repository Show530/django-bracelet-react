"""
URL configuration for personal_websites project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
# for google oauth
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
# for oauth to prevent rate limiting 
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
# import json # was for debugging
# for token refresh
from rest_framework_simplejwt.views import TokenRefreshView
from decouple import config
# https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react#step-2-setting-up-the-apis
# from rest_framework import routers
# from bracelet_backend import views

# router = routers.DefaultRouter()
# router.register(r'bracelets', views.ListBracelet, 'bracelet')

# Create a view that specifies the adapter
@method_decorator(ratelimit(key='ip', rate='5/m', method='POST'), name ='dispatch')
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    # react frontend
    callback_url = config('GOOGLE_OAUTH_CALLBACK', default="http://localhost:5173")
    client_class = OAuth2Client
   
# api path via
# https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bracelet_backend.urls')),

    path('accounts/', include('allauth.urls')),  # for oauth
    path('api/auth/', include('dj_rest_auth.urls')), # for oauth
    path('api/auth/registration/', include('dj_rest_auth.registration.urls')), # for oauth
    # token refresh path
    path('api/auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # problem fixed?
    # Google social login
    path(
        'api/auth/social/google/',
        GoogleLogin.as_view(),
        name='google_login'
    ),    
        
    # path('bracelet_backend/', include('bracelet_backend.urls'))
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
