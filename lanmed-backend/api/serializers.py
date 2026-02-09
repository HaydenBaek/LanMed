from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Profile, Document

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username')


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    name = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        email = validated_data['email'].lower()
        password = validated_data['password']
        name = validated_data.get('name', '')

        user = User.objects.create_user(
            username=email,
            email=email,
            password=password,
        )
        Profile.objects.create(user=user, name=name)
        return user


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].required = False

    def validate(self, attrs):
        email = attrs.get('email')
        if email and not attrs.get('username'):
            attrs['username'] = email
        return super().validate(attrs)


class ProfileSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', required=False)
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = Profile
        fields = (
            'email',
            'password',
            'name',
            'dob',
            'age',
            'allergies',
            'medications',
            'surgeries',
        )

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        password = validated_data.pop('password', None)
        email = user_data.get('email')
        if email:
            instance.user.email = email
            instance.user.username = email
            instance.user.save(update_fields=['email', 'username'])
        if password:
            instance.user.set_password(password)
            instance.user.save(update_fields=['password'])
        return super().update(instance, validated_data)


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = (
            'id',
            'pdf_name',
            'symptoms',
            'symptom_start_date',
            'symptom_start_time',
            'severity',
            'doctor_questions',
            'notes',
            'medication_taken',
            'source_language',
            'language',
            'translated_symptoms',
            'translated_questions',
            'translated_notes',
            'translated_medication_taken',
            'patient_name',
            'patient_dob',
            'patient_age',
            'patient_allergies',
            'patient_medications',
            'patient_surgeries',
            'translated_patient_name',
            'translated_patient_dob',
            'translated_patient_allergies',
            'translated_patient_medications',
            'translated_patient_surgeries',
            'created_at',
        )
        read_only_fields = ('id', 'created_at')
