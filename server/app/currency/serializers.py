from rest_framework import serializers

from core.models import BaseCurrency, ExchangeRate


class BaseCurrencySerializer(serializers.ModelSerializer):
    """Serializer for base currency object"""

    class Meta:
        model = BaseCurrency
        fields = ('id', 'base_currency', 'value')
        read_only_Fields = ('id',)


class ExchangeRateSerializer(serializers.ModelSerializer):
    """Serialize an ExchangeRate"""

    class Meta:
        model = ExchangeRate
        fields = (
            'id', 'currency', 'base_currency', 'value',
        )
        read_only_fields = ('id',)
