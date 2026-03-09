from django.core.management.base import BaseCommand
from bracelet_backend.models import Image
from PIL import Image as PILImage
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import os
from django.conf import settings

class Command(BaseCommand):
    help = 'Migrate existing images to R2 with resizing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be migrated without actually doing it',
        )

    def optimize_image(self, file_obj, max_size=(900, 1200)):
        """Resize and optimize image from file object"""
        try:
            img = PILImage.open(file_obj)

            # Convert RGBA to RGB if needed
            if img.mode in ('RGBA', 'LA', 'P'):
                background = PILImage.new('RGB', img.size, (255, 255, 255))
                if img.mode == 'RGBA':
                    background.paste(img, mask=img.split()[-1])
                else:
                    background.paste(img)
                img = background
            
            # Resize if larger than max
            original_size = img.size
            img.thumbnail(max_size, PILImage.Resampling.LANCZOS)

            # Save optimized image
            output = BytesIO()
            img.save(output, format='JPEG', quality=85, optimize=True)
            output.seek(0)

            file_size = output.getbuffer().nbytes
            return output, original_size, img.size, file_size

        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error optimizing image: {e}'))
            return None, None, None, None
        
    def handle(self, *args, **options):
        dry_run = options['dry_run']

        if dry_run:
            self.stdout.write(self.style.WARNING('DRY RUN MODE - No changes will be made'))
        
        images = Image.objects.all().order_by('order')
        # images = Image.objects.filter(order=1)
        total = images.count()
        migrated = 0
        skipped = 0
        errors = 0

        self.stdout.write(f'Found {total} images to migrate')

        for idx, img_obj in enumerate(images, 1):
            try:
                # Build the local file path manually
                local_path = os.path.join(settings.MEDIA_ROOT, img_obj.image_file.name)

                # Check if file exists locally
                if not os.path.exists(local_path):
                    self.stdout.write(
                        self.style.WARNING(f'[{idx}/{total}] SKIP: {img_obj.caption} - File not found at {local_path}')
                    )
                    skipped += 1
                    continue

                # Get original file size
                original_file_size = os.path.getsize(local_path)

                # Open and optimize the image from local file
                with open(local_path, 'rb') as f:
                    optimized, original_dims, new_dims, new_size = self.optimize_image(f)

                if optimized is None:
                    errors += 1
                    continue

                self.stdout.write(
                    f'[{idx}/{total}] {img_obj.caption}\n'
                    f'  Original: {original_dims} ({original_file_size / 1024 / 1024:.2f}MB)\n'
                    f'  Optimized: {new_dims} ({new_size / 1024:.2f}KB)'
                )
                
                if not dry_run:
                    # Save to R2
                    filename = os.path.basename(img_obj.image_file.name)

                    # Delete old file first (important!)
                    img_obj.image_file.delete(save=False)
                    
                    # Save optimized version to R2
                    img_obj.image_file.save(
                        filename,
                        InMemoryUploadedFile(
                            optimized,
                            'ImageField',
                            filename,
                            'image/jpeg',
                            new_size,
                            None
                        ),
                        save=True
                    )
                    
                    self.stdout.write(self.style.SUCCESS(f'  ✓ Uploaded to R2'))
                    migrated += 1
                else:
                    migrated += 1

            except Exception as e:
                self.stdout.write(
                    self.style.ERROR(f'[{idx}/{total}] ERROR: {img_obj.caption} - {e}')
                )
                errors += 1

        # Summary
        self.stdout.write('\n' + '='*50)
        self.stdout.write(self.style.SUCCESS(f'Migration Summary:'))
        self.stdout.write(f'  Total: {total}')
        self.stdout.write(self.style.SUCCESS(f'  Migrated: {migrated}'))
        self.stdout.write(self.style.WARNING(f'  Skipped: {skipped}'))
        self.stdout.write(self.style.ERROR(f'  Errors: {errors}'))
        
        if dry_run:
            self.stdout.write(self.style.WARNING('\nDRY RUN - Run without --dry-run to actually migrate'))

# from django.core.management.base import BaseCommand

# from bracelet_backend.models import Image
# from PIL import Image as PILImage
# from io import BytesIO
# from django.core.files.uploadedfile import InMemoryUploadedFile
# import os
# from django.conf import settings

# class Command(BaseCommand):
#     help = 'Migrate existing images to R2 with resizing'

#     def add_arguments(self, parser):
#         parser.add_argument(
#             '--dry-run',
#             action='store_true',
#             help='Show what would be migrated without actually doing it',
#         )
#         # return super().add_arguments(parser)

#     def optimize_image(self, file_path, max_size=(900, 1200)):
#         """Resize and optimize image"""
#         try:
#             img = PILImage.open(file_path)

#             # convert RGBA to RGB if needed
#             if img.mode in ('RGBA', 'LA', 'P'):
#                 background = PILImage.new('RGB', img.size, (255, 255, 255))
#                 if img.mode == 'RGBA':
#                     background.paste(img, mask=img.split()[-1])
#                 else:
#                     background.paste(img)
#                 img = background
#             # resize if larger than max
#             orginal_size = img.size
#             img.thumbnail(max_size, PILImage.Resampling.LANCZOS)

#             # save optimized image
#             output = BytesIO()
#             img.save(output, format='JPEG', quality=85, optimize=True)

#             file_size = output.getbuffer().nbytes
#             return output, orginal_size, img.size, file_size

#         except Exception as e:
#             self.stdout.write(self.style.ERROR(f'Error optimizing image: {e}'))
#             return None, None, None, None
        
#     def handle(self, *args, **options):
#         dry_run = options['dry_run']

#         if dry_run:
#             self.stdout.write(self.style.WARNING('DRY RUN MODE - No changes will be made'))
        
#         images = Image.objects.all().order_by('order')
#         total = images.count()
#         migrated = 0
#         skipped = 0
#         errors = 0

#         self.stdout.write(f'Found {total} images to migrate')

#         for idx, img_obj in enumerate(images, 1):
#             try:
#                 # # get curr file path
#                 # old_path = img_obj.image_file.path
#                 # img_obj.image_file.open()
#                 # image_file = img_obj.image_file
#                 file_path = os.path.join(settings.MEDIA_ROOT, img_obj.image_file.name)

#                 if not os.path.exists(file_path):
#                     self.stdout.write(
#                         self.style.WARNING(f'[{idx}/{total}] SKIP: {img_obj.caption} - File not found')
#                     )
#                     skipped += 1
#                     continue

#                 # get original file size
#                 # original_file_size = os.path.getsize(image_file)
#                 original_file_size = img_obj.image_file.size

#                 # optimize the image
#                 # optimized, original_dims, new_dims, new_size = self.optimize_image(file_path)
#                 # open locally for optimization
#                 with open(file_path, "rb") as f:
#                     optimized, original_dims, new_dims, new_size = self.optimize_image(f)

#                 if optimized is None:
#                     errors += 1
#                     continue

#                 self.stdout.write(
#                     f'[{idx}/{total}] {img_obj.caption}\n'
#                     f'Original: {original_dims} ({original_file_size / 1024 / 1024:.2f}MB)\n'
#                     f'Optimized: {new_dims} ({new_size / 1024:.2f}KB)'    
#                                   )
                
#                 if not dry_run:
#                     # Save to R2
#                     filename = os.path.basename(img_obj.image_file.name)
#                     # filename = os.path.os.path.splitext(os.path.basename(img_obj.image_file.name))[0] + "_optimized.jpg"

#                     img_obj.image_file.save(
#                         filename,
#                         InMemoryUploadedFile(
#                             optimized,
#                             'ImageField',
#                             filename,
#                             'image/jpeg',
#                             new_size,
#                             None
#                         ),
#                         save=True
#                     )
#                     self.stdout.write(self.style.SUCCESS(f' ✓ Uploaded to R2'))
#                     migrated += 1
#                 else:
#                     migrated += 1

#             except Exception as e:
#                 self.stdout.write(
#                     self.style.ERROR(f'[{idx}/{total}] ERROR: {img_obj.caption} - {e}')
#                 )
#                 errors += 1


#         self.stdout.write('\n' + '='*50)
#         self.stdout.write(self.style.SUCCESS(f'Migration Summary:'))
#         self.stdout.write(f'  Total: {total}')
#         self.stdout.write(self.style.SUCCESS(f'  Migrated: {migrated}'))
#         self.stdout.write(self.style.WARNING(f'  Skipped: {skipped}'))
#         self.stdout.write(self.style.ERROR(f'  Errors: {errors}'))
        
#         if dry_run:
#             self.stdout.write(self.style.WARNING('\nDRY RUN - Run without --dry-run to actually migrate'))
