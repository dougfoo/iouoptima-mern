from django.shortcuts import render

from .models import User, Loan
from .serializers import UserSerializer, LoanSerializer

from rest_framework import viewsets


class UserViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

class LoanViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing user instances.
    """
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()
