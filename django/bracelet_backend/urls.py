# File: bracelet_backend/urls.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/17/2025
# Description: app specific urls file

from django.urls import path
# from .views import *
# from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('bracelets/', views.ListBracelet.as_view()),
    path('bracelets/<int:pk>/', views.DetailBracelet.as_view()),
    path('images/', views.ListImage.as_view()),
    path('images/<int:pk>', views.DetailImage.as_view()),
]