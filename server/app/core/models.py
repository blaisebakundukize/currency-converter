from django.db import models


class BaseCurrency(models.Model):
    """Base Currency object"""
    base_currency = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=20, decimal_places=2, default=1.00)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.base_currency
