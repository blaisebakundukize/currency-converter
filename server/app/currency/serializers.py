from rest_framework import serializers

from core.models import BaseCurrency


class BaseCurrencySerializer(serializers.ModelSerializer):
    """Serializer for base currency object"""

    class Meta:
        model = BaseCurrency
        fields = ('id', 'base_currency', 'value')
        read_only_Fields = ('id',)