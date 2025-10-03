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

# https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react#step-2-setting-up-the-apis
# from rest_framework import routers
# from bracelet_backend import views

# router = routers.DefaultRouter()
# router.register(r'bracelets', views.ListBracelet, 'bracelet')

# api path via
# https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('bracelet_backend.urls')),
    # path('bracelet_backend/', include('bracelet_backend.urls'))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
