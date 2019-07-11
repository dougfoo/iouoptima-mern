from django.shortcuts import render

from .models import User, Loan
from .serializers import UserSerializer, LoanSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.generics import ListAPIView

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class LoanViewSet(viewsets.ModelViewSet):
#    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

class FriendList(ListAPIView):
    serializer = UserSerializer

    def get_queryset(self):
        user = self.request.user
        return User.objects.filter(user=user)
