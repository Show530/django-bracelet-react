# File: bracelet_backend/filters.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/28/2025
# Description: app specific filtering with API for frontend usage

import django_filters
from bracelet_backend.models import Bracelet, BraceletImage, Image

class BraceletFilter(django_filters.FilterSet):
    '''FilterSet for Bracelets'''
    # filtering by endDate (date bracelet was finished)
    # and 
    # whether the bracelet is for sale (denoted by selling, so going where = "SE")

    # set up finish year filter
    year = django_filters.NumberFilter(field_name="endDate", lookup_expr="year")

    # initalize filter for bracelets that are for sale
    selling = django_filters.BooleanFilter(method="selling_filter")

    class Meta:
        model = Bracelet
        # fields that we're filtering on, not necessarily fields included in result!
        fields = ['year', 'selling']

    # create filter for bracelets that are for sale
    def selling_filter(self, queryset, name, value):
        if value:
            #return queryset.filter(goingWhere=self.Meta.model.GoingWhere.SELLING)
            return queryset.filter(goingWhere="SE")
        return queryset
    
class ImageFilter(django_filters.FilterSet):
    '''FilterSet for Images'''
    # Filter by whether any of the Bracelets their associated Images are for sale
    selling = django_filters.BooleanFilter(method="selling_filter")

    class Meta:
        model = Image
        # fields that we're filtering on, not necessarily fields included in result!
        fields = ['selling']

    # create filter for Images with Bracelet for sale in them
    def selling_filter(self, queryset, name, value):
        if value:
            # find bracelets that are for sale
            sellingB = Bracelet.objects.filter(goingWhere="SE")
            # find bracelet images with bracelets associated that are for sale
            sellingBI = BraceletImage.objects.filter(bracelet__in=sellingB)
            # find pks of images in BraceletImage
            sellingImage_pks = sellingBI.values("image")

            return queryset.filter(pk__in=sellingImage_pks)
        return queryset 
