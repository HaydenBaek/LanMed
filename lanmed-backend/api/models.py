from django.conf import settings
from django.db import models


class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=150, blank=True)
    dob = models.DateField(null=True, blank=True)
    age = models.PositiveIntegerField(null=True, blank=True)
    allergies = models.TextField(blank=True)
    medications = models.TextField(blank=True)
    surgeries = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Profile({self.user_id})"


class Document(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='documents')
    pdf_name = models.CharField(max_length=255, blank=True)

    symptoms = models.TextField()
    symptom_start_date = models.DateField(null=True, blank=True)
    symptom_start_time = models.TimeField(null=True, blank=True)
    severity = models.PositiveSmallIntegerField(null=True, blank=True)
    doctor_questions = models.TextField(blank=True)
    notes = models.TextField(blank=True)
    medication_taken = models.TextField(blank=True)

    source_language = models.CharField(max_length=10, blank=True)
    language = models.CharField(max_length=10, blank=True)

    translated_symptoms = models.TextField(blank=True)
    translated_questions = models.TextField(blank=True)
    translated_notes = models.TextField(blank=True)
    translated_medication_taken = models.TextField(blank=True)

    patient_name = models.CharField(max_length=150, blank=True)
    patient_dob = models.DateField(null=True, blank=True)
    patient_age = models.PositiveIntegerField(null=True, blank=True)
    patient_allergies = models.TextField(blank=True)
    patient_medications = models.TextField(blank=True)
    patient_surgeries = models.TextField(blank=True)

    translated_patient_name = models.TextField(blank=True)
    translated_patient_dob = models.TextField(blank=True)
    translated_patient_allergies = models.TextField(blank=True)
    translated_patient_medications = models.TextField(blank=True)
    translated_patient_surgeries = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Document({self.id})"
