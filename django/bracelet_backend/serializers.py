# File: bracelet_backend/serializers.py
# Author: Sophia Howson (sophiahowson@gmail.com), 9/18/2025
# following https://medium.com/@gazzaazhari/django-backend-react-frontend-basic-tutorial-6249af7964e4
# Description: app specific serializer for translating data into JSON

from rest_framework import serializers
from bracelet_backend.models import Bracelet, Image, BraceletImage
from django.contrib.auth.models import User
# for optimizing images
from PIL import Image as PILImage
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

class ImageOptimizer:
    '''Custom utility class for image optimization'''
    def __init__(self, max_size=(900, 1200), quality=85):
        self.max_size = max_size
        self.quality=quality

    def optimize_image(self, image_file):
        '''Resize and optimize image before adding to database
            input: image_file: uploaded file or file-like object
            output: InMempryUploaded file: optimized image
        '''
        img = PILImage.open(image_file)
        # try:

        # except Exception as e:
        #     # Log the error in production
        #     import logging
        #     logger = logging.getLogger(__name__)
        #     logger.error(f"Image optimization failed: {e}")
            
        #     # Fallback: save original without optimization
        #     return image_file

        # convert RGBA to RGB to save as a JPEG- JPEG cannot have transparency
        # this adds a white background if needed
        if img.mode in ('RGBA', 'LA', 'P'):
            background = PILImage.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'RGBA':
                background.paste(img, mask=img.split()[-1])
            else:
                background.paste(img)
            img = background
        
        # resize if needded
        img.thumbnail(self.max_size, PILImage.Resampling.LANCZOS)

        # save optimized img
        output = BytesIO()
        img.save(output, format='JPEG', quality=self.quality, optimize=True)
        output.seek(0)

        # gets filename or sets a default
        filename = getattr(image_file, 'name', 'optimized.jpg')

        return InMemoryUploadedFile(
            output, 'ImageField', filename, 
            'image/jpeg', output.getbuffer().nbytes, None
        )

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
            # print("In Image File if statement- found")
            # order cannot be null on create, but will change after object is created

            # first optimize image, then create it
            optimizer = ImageOptimizer(max_size=(900, 1200), quality=85)
            opt_image_file = optimizer.optimize_image(image_file)

            image = Image.objects.create(
                image_file=opt_image_file,
                caption=caption or bracelet.name,
                favorite=False,
                order=-1
            )
            # for image: set order to id
            if image.order != image.id:
                lastImg = Image.objects.last()
                image.order = lastImg.order + 1
                image.save(update_fields=["order"])
            
            # print("Image is: ", image)

            # no need to save var of BraceletImage because goal is to create it!
            BraceletImage.objects.create(bracelet=bracelet, image=image)
            # print("Saved BI")

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
            # print("In Image File if statement- found")
            # order cannot be null on create, but will change after object is created

            # first optimize image, then create it
            optimizer = ImageOptimizer(max_size=(900, 1200), quality=85)
            opt_image_file = optimizer.optimize_image(image_file)

            image = Image.objects.create(
                image_file=opt_image_file,
                caption=caption or instance.name,
                favorite=False,
                order=-1
            )

            # for image: set order to id
            if image.order != image.id:
                lastImg = Image.objects.last()
                image.order = lastImg.order + 1
                image.save(update_fields=["order"])
            # print("Image is: ", image)

            BraceletImage.objects.create(bracelet=instance, image=image)
            # print("Saved BI")

        return instance



class ImageSerializer(serializers.ModelSerializer):
    '''Serializer for Images'''
    bracelets = serializers.SerializerMethodField()
    # added for absolute url
    image_url = serializers.SerializerMethodField()
    # added to allow for BraceletImage creation on frontend
    # define bracelet_ids as a serializer field
    bracelet_ids = serializers.ListField(
        # Changed to CharField since IDs are strings
        child=serializers.CharField(),
        write_only=True,
        required=False
    )

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
            'bracelet_ids',
        )
        extra_kwargs = {
            # Make order optional
            'order': {'required': False},
             # Default to False
            'favorite': {'required': False, 'default': False},
        }

    # Custom create method
    # Returns complete instances based on data- based on documentation
    def create(self, validated_data):
        '''Returns image object '''
        # Get variables from data- pop off to create with
        bracelet_ids = validated_data.pop("bracelet_ids", None)
        
        image_file = validated_data.get("image_file", None)

        # if image is included,
        # create the image and bracelet image objects 
        if not image_file:
            raise serializers.ValidationError(
                {"image_file": "This field is required."}
            )
        
        # will fix based on last item below
        if 'order' not in validated_data:
            validated_data['order'] = -1  
        
        # first optimize image, then create it
        optimizer = ImageOptimizer(max_size=(900, 1200), quality=85)
        validated_data['image_file'] = optimizer.optimize_image(image_file)

        image = Image.objects.create(**validated_data)
        # print("Image saved with id: ", image.id)
        if image.order is None or image.order == -1:
            lastImg = Image.objects.exclude(id=image.id).order_by('order').last()
            if lastImg:
                image.order = lastImg.order + 1
            else:
                image.order = 1
            image.save(update_fields=["order"])

        # Update bracelet relationships if changed
        if bracelet_ids is not None:
            # get rid of previous relationships
            BraceletImage.objects.filter(image=image).delete()

            for bracelet_id in bracelet_ids:
                # make sure to make a string!
                bracelet_id = str(bracelet_id).strip()
                # print(f"Looking for bracelet with id: {bracelet_id}")
                
                try:
                    bracelet = Bracelet.objects.get(id=bracelet_id)
                    BraceletImage.objects.create(
                        image=image,
                        bracelet=bracelet
                    )
                except Bracelet.DoesNotExist:
                    print(f"Bracelet with id {bracelet_id} not found")
                    continue

        # print('Finished create')
        return image
    
    def update(self, instance, validated_data):
        '''Returns updated Image instance'''
        # Get variables from data- pop off so that fields are not included 
        # for bracelet update
        bracelet_ids = validated_data.pop("bracelet_ids", None)
        image_file = validated_data.get("image_file", None)
        # print("Image_file is: ", image_file)
        caption = validated_data.get("caption", "")
        # print("Caption is: ", caption)

        if caption is not None:
            instance.caption = caption

        if image_file is not None:
            instance.image_file = image_file

        instance.save()
        
        # Update bracelet relationships if changed
        if bracelet_ids is not None:
            # get rid of previous relationships
            BraceletImage.objects.filter(image=instance).delete()

            for bracelet_id in bracelet_ids:
                # make sure to make a string!
                bracelet_id = str(bracelet_id).strip()
                # print(f"Looking for bracelet with id: {bracelet_id}")
                
                try:
                    bracelet = Bracelet.objects.get(id=bracelet_id)
                    BraceletImage.objects.create(
                        image=instance,
                        bracelet=bracelet
                    )
                except Bracelet.DoesNotExist:
                    print(f"Bracelet with id {bracelet_id} not found")
                    continue
            
        return instance


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