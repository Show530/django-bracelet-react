# File: bracelet_backend/filters.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/28/2025
# Description: app specific filtering with API for frontend usage
import django_filters
from bracelet_backend.models import Bracelet, BraceletImage, Image
from django.db.models import Max


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
        '''Custom filter for finding Bracelets which are either for or not for sale'''
        if value == True:
            #return queryset.filter(goingWhere=self.Meta.model.GoingWhere.SELLING)
            return queryset.filter(goingWhere="SE").order_by("order")
        elif value == False:
            return queryset.exclude(goingWhere="SE").order_by("order")
        else:
            return queryset.order_by("order")
    
class ImageFilter(django_filters.FilterSet):
    '''FilterSet for Images'''
    # Filter by when the last bracelet in the image was completed
    # year = django_filters.NumberFilter(field_name="endDate", lookup_expr="year")

    # Filter by whether any of the Bracelets their associated Images are for sale
    selling = django_filters.BooleanFilter(method="selling_filter")

    year = django_filters.NumberFilter(lookup_expr="year", method="year_filter")
    class Meta:
        model = Image
        # fields that we're filtering on, not necessarily fields included in result!
        fields = ['selling', 'year']

    def year_filter(self, queryset, name, value):
        '''Custom filter to filter for the last finish date in a set of bracelets'''
        # currImage = Image.objects.filter(image_pk=self.pk)
        if value == 2023 or value == 2024 or value == 2025:
            # The following gets all of the Images that have bracelets within the filtered year
            # yearB = Bracelet.objects.filter(endDate__year=value)
            # yearBI = BraceletImage.objects.filter(bracelet__in=yearB)
            # yearImage_pks = yearBI.values("image")
            
            # The following gets the images which have a final date in the filtered year
            queryset = queryset.annotate(
                latest_year = Max("braceletimage__bracelet__endDate__year")
            )

            return queryset.filter(latest_year=value).order_by("order")
        else:
            return queryset.order_by("order")


    # create filter for Images with Bracelet for sale in them
    def selling_filter(self, queryset, name, value):
        '''Custom filter to find Images with Bracelets that are for sale within them'''
        if value == True:
            # find bracelets that are for sale
            sellingB = Bracelet.objects.filter(goingWhere="SE")
            # find bracelet images with bracelets associated that are for sale
            sellingBI = BraceletImage.objects.filter(bracelet__in=sellingB)
            # find pks of images in BraceletImage
            sellingImage_pks = sellingBI.values("image")

            return queryset.filter(pk__in=sellingImage_pks).order_by("order")
        elif value == False:
            # find bracelets that are not for sale
            notSellingB = Bracelet.objects.exclude(goingWhere="SE")
            # find bracelet images with bracelets associated that are for sale
            notSellingBI = BraceletImage.objects.filter(bracelet__in=notSellingB)
            # find pks of images in BraceletImage
            notSellingImage_pks = notSellingBI.values("image")

            return queryset.filter(pk__in=notSellingImage_pks).order_by("order")
        else:
            return queryset.order_by("order")
