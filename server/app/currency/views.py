from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny

from core.models import BaseCurrency, ExchangeRate

from currency import serializers


class ActionBasedPermission(AllowAny):
    """
    Grant or deny access to a view, based on a mapping in view.action_permissions
    """
    def has_permission(self, request, view):
        for klass, actions in getattr(view, 'action_permissions', {}).items():
            if view.action in actions:
                return klass().has_permission(request, view)
        return False


class BaseViewSet(viewsets.ModelViewSet):
    """Base view set for other view to inherent"""
    permission_classes = (ActionBasedPermission,)
    action_permissions = {
        IsAuthenticated: ['update', 'partial_update', 'destroy', 'create'],
        AllowAny: ['list', 'retrieve']
    }
    authentication_classes = (TokenAuthentication, SessionAuthentication)

    def perform_create(self, serializer):
        """Create a new base currency"""
        serializer.save(user=self.request.user)


class BaseCurrencyViewSet(BaseViewSet):
    """Manage base currency in the database"""
    serializer_class = serializers.BaseCurrencySerializer
    queryset = BaseCurrency.objects.all()


class ExchangeRateViewSet(BaseViewSet):
    """Manage exchange rate in the database"""
    serializer_class = serializers.ExchangeRateSerializer
    queryset = ExchangeRate.objects.all()
