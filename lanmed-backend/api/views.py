import os

import requests
from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Profile, Document
from .serializers import (
    RegisterSerializer,
    EmailTokenObtainPairSerializer,
    ProfileSerializer,
    DocumentSerializer,
)

User = get_user_model()


class RegisterView(generics.GenericAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        refresh = RefreshToken.for_user(user)
        return Response(
            {
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'username': user.username,
                },
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            },
            status=status.HTTP_201_CREATED,
        )


class EmailTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]
    serializer_class = EmailTokenObtainPairSerializer


class MeProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer

    def get_object(self):
        profile, _ = Profile.objects.get_or_create(user=self.request.user)
        return profile


class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = DocumentSerializer

    def get_queryset(self):
        return Document.objects.filter(user=self.request.user).order_by('-created_at')

    def perform_create(self, serializer):
        profile = Profile.objects.filter(user=self.request.user).first()
        data = {}
        if profile:
            data = {
                'patient_name': profile.name,
                'patient_dob': profile.dob,
                'patient_age': profile.age,
                'patient_allergies': profile.allergies,
                'patient_medications': profile.medications,
                'patient_surgeries': profile.surgeries,
            }
        serializer.save(user=self.request.user, **data)


class TranslateView(APIView):
    def post(self, request, *args, **kwargs):
        text = request.data.get('text')
        source_lang = request.data.get('source_lang')
        target_lang = request.data.get('target_lang')

        if not text:
            return Response({'detail': 'text is required'}, status=status.HTTP_400_BAD_REQUEST)
        if not target_lang:
            return Response({'detail': 'target_lang is required'}, status=status.HTTP_400_BAD_REQUEST)

        api_key = os.environ.get('DEEPL_API_KEY')
        if not api_key:
            return Response({'detail': 'DEEPL_API_KEY not configured'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        api_url = os.environ.get('DEEPL_API_URL', 'https://api-free.deepl.com/v2/translate')
        payload = {
            'auth_key': api_key,
            'text': text,
            'target_lang': target_lang,
        }
        if source_lang:
            payload['source_lang'] = source_lang

        try:
            response = requests.post(api_url, data=payload, timeout=15)
        except requests.RequestException:
            return Response({'detail': 'Translation request failed'}, status=status.HTTP_502_BAD_GATEWAY)

        if not response.ok:
            return Response({'detail': 'Translation service error'}, status=status.HTTP_502_BAD_GATEWAY)

        data = response.json()
        translations = data.get('translations') or []
        if not translations:
            return Response({'detail': 'No translations returned'}, status=status.HTTP_502_BAD_GATEWAY)

        return Response({'text': translations[0].get('text', '')})
