from django.shortcuts import render

from .models import User, Loan
from .serializers import UserSerializer, LoanSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets

class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class LoanViewSet(viewsets.ModelViewSet):
#    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

    # def create(self, request):
    #     print("loan create request: "+str(request))
    #     pass
