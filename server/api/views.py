from django.shortcuts import render
from .models import Loan, Profile
from .serializers import UserSerializer, LoanSerializer, FriendSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all().select_related('profile')

class LoanViewSet(viewsets.ModelViewSet):
#    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

class FriendList(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all().select_related('profile') # should grab friends only ?
    
