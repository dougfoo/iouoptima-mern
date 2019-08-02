from django.shortcuts import render
from .models import Loan, Profile
from .serializers import ProfileSerializer, LoanSerializer, FriendSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class LoanViewSet(viewsets.ModelViewSet):
#    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

# class FriendList(ListAPIView):
#      serializer_class = ProfileSerializer

def get_userid(self, username):
    queryset = User.objects.filter(username=username)
    profile = queryset[0].profile
    d = {'userid': profile.id }
    return JsonResponse(d, safe=False)
