from django.contrib import admin
from .models import Profile, Document


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'name', 'dob', 'age')
    search_fields = ('user__email', 'name')


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'pdf_name', 'created_at')
    search_fields = ('pdf_name', 'user__email')
    list_filter = ('created_at',)
