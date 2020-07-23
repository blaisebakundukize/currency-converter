from django.urls import path, include
from rest_framework.routers import DefaultRouter

from currency import views


router = DefaultRouter()
router.register('base', views.BaseCurrencyViewSet)
router.register('exchange_rates', views.ExchangeRateViewSet)

app_name = 'currency'

urlpatterns = [
    path('', include(router.urls))
]
