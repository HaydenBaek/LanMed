from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import RegisterView, EmailTokenObtainPairView, MeProfileView, DocumentViewSet, TranslateView

router = DefaultRouter()
router.register('documents', DocumentViewSet, basename='documents')

urlpatterns = [
    path('auth/register', RegisterView.as_view(), name='register'),
    path('auth/login', EmailTokenObtainPairView.as_view(), name='login'),
    path('auth/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('me/profile', MeProfileView.as_view(), name='me_profile'),
    path('translate', TranslateView.as_view(), name='translate'),
    path('', include(router.urls)),
]
