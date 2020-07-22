from django.urls import path, include
from rest_framework.routers import DefaultRouter

from base_currency import views


router = DefaultRouter()
router.register('base', views.BaseCurrencyViewSet)

app_name = 'base_currency'

urlpatterns = [
    path('', include(router.urls))
]
