# File: bracelet_backend/views.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/17/2025
# Description: app specific views file

from django.shortcuts import render
# API views via 
# https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
# also
# https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react#prerequisites
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend

from bracelet_backend.models import Bracelet, Image
from bracelet_backend.serializers import BraceletSerializer, ImageSerializer
from bracelet_backend.filters import BraceletFilter, ImageFilter

# Create your views here.

class ListBracelet(generics.ListCreateAPIView):
    queryset = Bracelet.objects.all()
    serializer_class = BraceletSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = BraceletFilter

class DetailBracelet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bracelet.objects.all()
    serializer_class = BraceletSerializer

class ListImage(generics.ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ImageFilter

class DetailImage(generics.RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer