# File: bracelet_backend/serializers.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/18/2025
# following https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
# Description: app specific serializer for translating data into JSON

from rest_framework import serializers
from bracelet_backend.models import Bracelet, Image, BraceletImage


class BraceletSerializer(serializers.ModelSerializer):
    '''Serializer for Bracelets'''
    
    # images = serializers.SerializerMethodField()
    class Meta:
        model = Bracelet
        fields = (
            'id',
            'name',
            'pattern_url',
            'bType',
            'startDate',
            'endDate',
            'numColors',
            'bLength',
            'numStrings',
            'goingWhere',
            'price',
        )

        # def get_images(self, obj):
        #     ''' Returns a list of all the images associated with the given Bracelet'''
        #     return [img.image_file.url for img in obj.get_images()]

class ImageSerializer(serializers.ModelSerializer):
    '''Serializer for Images'''
    bracelets = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = (
            'id',
            'image_file',
            'caption',
            'bracelets',
        )

    def get_bracelets(self, obj):
        ''' Returns a list of all the given bracelets associated with the given Image'''
        return [{"id": b.id, "name": b.name} 
                for b in Bracelet.objects.filter(braceletimage__image=obj)]