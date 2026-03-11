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
# for api lockdown
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAdminUser
# for year endpoint
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Min, Max

from bracelet_backend.models import Bracelet, Image, BraceletImage
from bracelet_backend.serializers import BraceletSerializer, ImageSerializer
# allows filters for API- in this instance, selling/year filters
from bracelet_backend.filters import BraceletFilter, ImageFilter
# allows bracelet forms to accpet images- upload from front end
from rest_framework.parsers import MultiPartParser, FormParser
# allows custom pagination to be created
from rest_framework.pagination import PageNumberPagination
# allows order for api
from rest_framework.filters import OrderingFilter

# Create your views here.

# custom pagination class
class ImagePagination(PageNumberPagination):
    page_size = 24
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['GET'])
def year_bounds(request):
    ''' API view for getting the boundaries for the images of each year '''
    
    # Get all of the unique years
    years = Image.objects.annotate(
                latest_year = Max("braceletimage__bracelet__endDate__year")
            ).values_list('latest_year', flat=True).distinct().order_by('latest_year')
    
    boundaries = {}

    for year in years:
        if year:
            currImages = Image.objects.annotate(
                latest_year = Max("braceletimage__bracelet__endDate__year")
            ).filter(latest_year=year).order_by("order")

            if currImages.exists():
                boundaries[(str(year))] = {
                    "start": currImages.first().order,
                    "end": currImages.last().order,
                }

    return Response(boundaries)

class ListBracelet(generics.ListCreateAPIView):
    ''' API view for getting, and posting to bracelet objects '''
    queryset = Bracelet.objects.all()
    serializer_class = BraceletSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = BraceletFilter
    parser_classes = [MultiPartParser, FormParser]
    ordering_fields = ['order', 'created_at']
    ordering = ['order']

    # allows anyone to read (GET) and only admin to create/delete (POST)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'POST':
            return[IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]

class DetailBracelet(generics.RetrieveUpdateDestroyAPIView):
    ''' API view for getting, updating, and deleting the details of a 
    particular bracelet object '''
    queryset = Bracelet.objects.all()
    serializer_class = BraceletSerializer
    parser_classes = [MultiPartParser, FormParser]
    # allows anyone to read (GET) and only admin to create/delete (POST)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return[IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]

class ListImage(generics.ListCreateAPIView):
    ''' API view for getting, and posting to image objects '''
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    # custom pagination
    pagination_class = ImagePagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_class = ImageFilter
    parser_classes = [MultiPartParser, FormParser]
    ordering_fields = ['order', 'created_at']
    ordering = ['order']

    # allows anyone to read (GET) and only admin to create/delete (POST)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method == 'POST':
            return[IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]

class DetailImage(generics.RetrieveUpdateDestroyAPIView):
    ''' API view for getting, updating, and deleting the details of a 
    particular image object '''
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
    # important- not id anymore! Can remove to change to pk
    lookup_field = 'order'
    parser_classes = [MultiPartParser, FormParser]
    # allows anyone to read (GET) and only admin to create/delete (POST)
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_permissions(self):
        if self.request.method in ['PUT', 'PATCH', 'DELETE']:
            return[IsAdminUser()]
        return [IsAuthenticatedOrReadOnly()]