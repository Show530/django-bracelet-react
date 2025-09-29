# File: bracelet_backend/serializers.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/18/2025
# following https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
# Description: app specific serializer for translating data into JSON

from rest_framework import serializers
from bracelet_backend.models import Bracelet


class BraceletSerializer(serializers.ModelSerializer):
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