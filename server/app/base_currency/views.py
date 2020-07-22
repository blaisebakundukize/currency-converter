from rest_framework import viewsets

from core.models import BaseCurrency

from base_currency import serializers


class BaseCurrencyViewSet(viewsets.ModelViewSet):
    """Manage base currency in the database"""
    serializer_class = serializers.BaseCurrencySerializer
    queryset = BaseCurrency.objects.all()
    # permission_classes = [AllowAny]

    # def get_queryset(self):
    #     """Retrieve the base currencies"""
    #     queryset = self.queryset
    #     return queryset.filter().order_by('-base_currency')

    # def perform_create(self, serializer):
    #     """Create a new base currency"""
    #     serializer.save()
