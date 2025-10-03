from django.db import models
from django.utils.translation import gettext_lazy as _
from datetime import datetime

# Create your models here.

class Bracelet(models.Model):
    '''Encapsulates the data of a friendship bracelet model'''
    # name
    # Pattern
    # Type (alpha or normal)
    # date started
    # date finished
    # num colors
    # length (airpods case, choker, bracelet, chapstick holder, bookmark, wallhanging, keychain)
    # num strings
    # where is it going? Giving, keeping, selling
    # maybe have a gave/sold option so bracelets that aren't sold can be displayed
    # if selling/sold - price
    # if giving - to whom? - maybe not on website

    # for Bracelet Types, using info from
    # https://docs.djangoproject.com/en/5.2/ref/models/fields/


    class BraceletType(models.TextChoices):
        ALPHA = "A", _("Alpha")
        NORMAL = "N", _("Normal")
        MACREME = "M", _("Macreme")

    class BraceletLength(models.TextChoices):
        AIRPODCASE = "AC", _("Airpod case")
        ANKLET = "A", _("Anklet")
        BELT = "BE", _("Belt")
        BRACELET = "B", _("Bracelet")
        BOOKMARK = "BM", _("Bookmark")
        CHAPSTICKHOLDER = "CS", _("Chapstick holder")
        CHOKER = "C", _("Choker")
        HAIRPIECE = "H", _("Hairpiece")
        KEYCHAIN = "K", _("Keychain")
        PATCH = "P", _("Patch")
        WALLHANGING = "W", _("Wallhanging")
        UNKNOWN = "U", _("Unknown")

    class GoingWhere(models.TextChoices): 
        KEEPING = "K", _("Keeping")
        GIVING = "GI", _("Giving away")
        GAVE = "GA", _("Gave away")
        SELLING = "SE", _("Selling")
        SOLD = "SO", _("Sold")
        UNKNOWN = "U", _("Unknown")

    order = models.IntegerField()

    name = models.TextField(blank=False)
    pattern_url = models.URLField(blank=True)
    bType = models.CharField(max_length=1, choices=BraceletType, default=BraceletType.NORMAL, blank=False)
    startDate = models.DateField(blank=True)
    endDate = models.DateField(blank=True)
    numColors = models.IntegerField(null= True, blank=True)
    bLength = models.CharField(max_length=2, choices=BraceletLength, default=BraceletLength.BRACELET, blank=False)
    numStrings = models.IntegerField(blank=False)
    goingWhere = models.CharField(max_length=2, choices=GoingWhere, default=GoingWhere.KEEPING, blank=False)
    price = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)

    def __str__(self):
        '''A string representation of the model.'''
        if self.startDate and self.endDate:
            # formattedStartDate = self.startDate.strftime("%m-%d-%Y")
            # formattedEndDate = self.endDate.strftime("%m-%d-%Y")
            return f'{self.id} : {self.name} created between the dates of {self.startDate} and {self.endDate}'
        elif self.startDate:
            # formattedStartDate = self.startDate.strftime("%m-%d-%Y")
            return f'{self.id} : {self.name} started {self.startDate}'
        elif self.endDate:
            # formattedEndDate = self.endDate.strftime("%m-%d-%Y")
            return f'{self.id} : {self.name} finished {self.endDate}'
        else:
            return f'{self.id} : {self.name} going {self.goingWhere}'
        
    class Meta:
        ordering = ['order']

    def get_images(self):
        '''method that will return the images associated with the given status message.'''

        # Basically- filter the bracelet images to get the bracelet images that relate to the current bracelet
        bracelet_images = BraceletImage.objects.filter(bracelet=self)
        # Pull out the column of image within Bracelet Images- this will be in the form <QuerySet {"image": pk}>
        # where pk is the primary key per image that relates to the bracelet image
        # https://stackoverflow.com/questions/1058135/django-convert-a-list-back-to-a-queryset
        images_pks = bracelet_images.values("image")
        # Now that we have the pks, use pk__in which will look through the query set and find all pks and 
        # match them to image objects, then return the queryset of image objects
        images = Image.objects.filter(pk__in=images_pks)
        return images

class Image(models.Model):
    '''Encapsulate the data model of an Image for a Bracelet.'''
    order = models.IntegerField()

    image_file = models.ImageField(blank=False, upload_to="bracelets/")
    timestamp = models.DateTimeField(auto_now=True)
    caption = models.TextField(blank=True)

    def __str__(self):
        '''return a string representation of this model instance'''
        return f'{self.caption}'
    
    class Meta:
        ordering = ['order']



# As bracelets and images share a many to many relationship, 
# gotta use a model to encapsulate said relationship
class BraceletImage(models.Model):
    '''Encapsulate the relationship between a Bracelet and an Image.'''
    bracelet = models.ForeignKey(Bracelet, on_delete=models.CASCADE)
    image = models.ForeignKey(Image, on_delete=models.CASCADE)

    def __str__(self):
        '''return a string representation of this model instance'''
        return f'{self.bracelet.id}: {self.bracelet.name} and {self.image.caption}'


 
# order_bracelets()
# set order fields 
# def order_bracelets() :
#     '''Function to set the order fields of bracelets'''
#     bracelets = Bracelet.objects.all()
#     for bracelet in bracelets:
#         bracelet.order = bracelet.pk
#         bracelet.save(update_fields=["order"]) 
#         print("Set order to pk: ", bracelet.order)

# 129
# update order of images
# def update_imageO() :
#     '''Function to update the order fields of bracelets'''
#     images = Image.objects.filter(order__gte=154).update(order=models.F('order') + 1)
    
#     imageToFix = Image.objects.get(order=-1)
#     imageToFix.order = 154
#     imageToFix.save(update_fields=["order"])

    # for bracelet in bracelets:
    #     bracelet.order = bracelet.pk
    #     bracelet.save(update_fields=["order"]) 
    #     print("Set order to pk: ", bracelet.order)

# Bracelet load_data() function
# def load_data():
#     '''Function to load data records from CSV file into Django database.'''
#     # To call:
#     # python manage.py shell, from yourapp.models import *, load_data()
    
#     for i in range(3, 6):
#         filename='./CSV_edit_202' + str(i) + '.csv'
#         f = open(filename, 'r') # open file for reading

#         # discard headers:
#         # get rid of headers
#         f.readline() # do nothing

#         # read the entire row one line at a time
        
#         for line in f:
#             try:
#                 fields = line.strip().split(',')
#                 # print(fields)

#                 # show which value in each field
#                 # fields[0] = 1
#                 # fields[1] = Ship's Wheel Burst
#                 # fields[2] = https://www.braceletbook.com/patterns/normal/109070/
#                 # fields[3] = Normal
#                 # fields[4] = 1/1/2023
#                 # fields[5] = 1/2/2023
#                 # fields[6] = 6
#                 # fields[7] = Bracelet
#                 # fields[8] = 30
#                 # fields[9] = Keeping
                
#                 type = ''
#                 if fields[3] == "Macreme":
#                     type = "M"
#                 elif fields[3] == "Alpha":
#                     type = "A"
#                 else:
#                     type = "N"

#                 length = ''
#                 match fields[7]:
#                     case "Airpod case":
#                         length = 'AC'
#                     case "Anklet":
#                         length = 'A'
#                     case "Bracelet":
#                         length = 'B'
#                     case "Belt": 
#                         length = 'BE'
#                     case "Bookmark":
#                         length = 'BM'
#                     case "Chapstick holder":
#                         length = 'CS'
#                     case "Choker":
#                         length = 'C'
#                     case "Hairpiece":
#                         length = 'H'
#                     case "Keychain":
#                         length = 'K'
#                     case "Patch":
#                         length = 'P'
#                     case "Wallhanging":
#                         length = 'W'
#                     case _:
#                         length = 'U'
                
#                 goingWhere = ''
#                 match fields[9]:
#                     case "Keeping":
#                         goingWhere = 'K'
#                     case "Giving away":
#                         goingWhere = 'GI'
#                     case "Gave away":
#                         goingWhere = 'GA'
#                     case "Selling": 
#                         goingWhere = 'SE'
#                     case "Sold":
#                         goingWhere = 'SO'
#                     case _:
#                         goingWhere = 'U'

                

#                 # create a new instance of Bracelet object with this record from CSV
#                 if fields[6] == "":
#                     bracelet = Bracelet(
#                                     name=fields[1],
#                                     pattern_url=fields[2],
#                                     bType=type,

#                                     startDate = datetime.strptime(fields[4], "%m/%d/%Y").date(),
#                                     endDate = datetime.strptime(fields[5], "%m/%d/%Y").date(),

#                                     bLength = length,
#                                     numStrings = int(fields[8]),

#                                     goingWhere = goingWhere,
#                                 )
#                     bracelet.save() # commit this result to the database!
#                 else: 
#                     bracelet = Bracelet(
#                                     name=fields[1],
#                                     pattern_url=fields[2],
#                                     bType=type,

#                                     startDate = datetime.strptime(fields[4], "%m/%d/%Y").date(),
#                                     endDate = datetime.strptime(fields[5], "%m/%d/%Y").date(),

#                                     numColors = int(fields[6]),
#                                     bLength = length,
#                                     numStrings = int(fields[8]),

#                                     goingWhere = goingWhere,
#                     #               price = fields[9],
#                                 )
#                     bracelet.save() # commit this result to the database!
#             except Exception as e:
#                 print("Something went wrong: ", e)
#                 print(f'line={line}')
#         print(f'Done. Created {len(Bracelet.objects.all())} Bracelets')
#     print(f'Done. Created {len(Bracelet.objects.all())} Bracelets')



# # Image load_images() function for 
# # import image files
# import os
# import re
# from django.core.files import File
# # from bracelet_backend.models import Image   # adjust for your models
# def extract_number(filename: str) -> int:
#     """
#     Extract the first number (or the first part of a range) from the filename.
#     Example: img_2025bracelet_120_122.jpeg -> 120
#     """
#     # match = re.search(r'(\d+)', filename)
#     # return int(match.group(1)) if match else 0
#     match = re.search(r'bracelet_(\d+)', filename)
#     return int(match.group(1)) if match else float('inf')

# def load_images():
    
#     for i in range(3, 6):
#         # folder where your images are stored
#         folder_path = 'C:/Users/sophi/OneDrive/Desktop/django-bracelet-react/django/202' + str(i) + '/Watermarked'

#         count = 0

#         files = sorted(os.listdir(folder_path), key=extract_number)

#         for filename in files:
#             if filename.endswith((".jpg", ".png", ".jpeg")):
#                 file_path = os.path.join(folder_path, filename)
#                 with open(file_path, "rb") as f:
#                     img = Image()
#                     img.caption = filename
#                     # print(filename)
#                     count += 1
#                     img.image_file.save(filename, File(f), save=True)
#                     # print('Saved')
#         print('Saved '+ str(count) + ' images from 202' + str(i))