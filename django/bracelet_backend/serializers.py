# File: bracelet_backend/serializers.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/18/2025
# following https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
# Description: app specific serializer for translating data into JSON

from rest_framework import serializers
from bracelet_backend.models import Bracelet, Image, BraceletImage
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= (
            'pk', 
            'username', 
            'email', 
            'first_name', 
            'last_name', 
            'is_staff', 
            'is_superuser', 
            'is_active',
        )
        read_only_fields = (
            'pk', 
            'email', 
            'is_staff', 
            'is_superuser', 
            'is_active',
        )

class BraceletSerializer(serializers.ModelSerializer):
    '''Serializer for Bracelets'''
    image_file = serializers.ImageField(write_only=True, required=False)
    caption = serializers.CharField(write_only=True, required=False)

    # images = serializers.SerializerMethodField()
    class Meta:
        model = Bracelet
        fields = (
            'id',
            'order',
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
            # need to include new fields!!
            'image_file',
            'caption',
        )

    # def get_images(self, obj):
    #     ''' Returns a list of all the images associated with the given Bracelet'''
    #     return [img.image_file.url for img in obj.get_images()]

    # Custom create method
    # Returns complete instances based on data- based on documentation
    def create(self, validated_data):
        '''Returns bracelet object while first creating an Image and BraceletImage object
            based on an input image if input'''
        # Get variables from data- pop off so that fields are not included 
        # for bracelet creation
        image_file = validated_data.pop("image_file", None)
        # print("Image_file is: ", image_file)
        caption = validated_data.pop("caption", "")
        # print("Caption is: ", caption)
        bracelet = Bracelet.objects.create(**validated_data)

        # if image is included,
        # create the image and bracelet image objects 
        if image_file:
            print("In Image File if statement- found")
            # order cannot be null on create, but will change after object is created
            image = Image.objects.create(
                image_file=image_file,
                caption=caption or bracelet.name,
                favorite=False,
                order=-1
            )
            # for image: set order to id
            if image.order != image.id:
                lastImg = Image.objects.last()
                image.order = lastImg.order + 1
                image.save(update_fields=["order"])
            
            print("Image is: ", image)

            # no need to save var of BraceletImage because goal is to create it!
            BraceletImage.objects.create(bracelet=bracelet, image=image)
            print("Saved BI")

        # for bracelet: set order to id
        if bracelet.order != bracelet.id:
            bracelet.order = bracelet.id
            bracelet.save(update_fields=["order"])
        
        
        return bracelet
    
    def update(self, instance, validated_data):
        '''Returns updated Bracelet instance while potentially adding an image'''
        # Get variables from data- pop off so that fields are not included 
        # for bracelet update
        image_file = validated_data.pop("image_file", None)
        # print("Image_file is: ", image_file)
        caption = validated_data.pop("caption", "")
        # print("Caption is: ", caption)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if image_file:
            print("In Image File if statement- found")
            # order cannot be null on create, but will change after object is created
            image = Image.objects.create(
                image_file=image_file,
                caption=caption or instance.name,
                favorite=False,
                order=-1
            )

            # for image: set order to id
            if image.order != image.id:
                lastImg = Image.objects.last()
                image.order = lastImg.order + 1
                image.save(update_fields=["order"])
            print("Image is: ", image)

            BraceletImage.objects.create(bracelet=instance, image=image)
            print("Saved BI")

        return instance



class ImageSerializer(serializers.ModelSerializer):
    '''Serializer for Images'''
    bracelets = serializers.SerializerMethodField()
    # added for absolute url
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Image
        fields = (
            'id',
            'order',
            'image_file',
            # new for absolute url
            'image_url',
            'caption',
            'bracelets',
        )

    # attempting to fix absolute uri
    def get_image_url(self, obj):
        '''Returns an absolute path for an image'''
        request = self.context.get('request')
        if request is not None:
            return request.build_absolute_uri(obj.image_file.url)
        return obj.image.url


    def get_bracelets(self, obj):
        ''' Returns a list of all the given bracelets associated with the given Image'''
        return [{"id": b.id, "name": b.name} 
                for b in Bracelet.objects.filter(braceletimage__image=obj)]