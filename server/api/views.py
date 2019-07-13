from django.shortcuts import render
from .models import Loan, Profile
from .serializers import ProfileSerializer, LoanSerializer, FriendSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.generics import ListAPIView
from django.contrib.auth.models import User

class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

class LoanViewSet(viewsets.ModelViewSet):
#    permission_classes = (IsAuthenticated,)
    serializer_class = LoanSerializer
    queryset = Loan.objects.all()

# class FriendList(ListAPIView):
#      serializer_class = ProfileSerializer

#     def get_queryset(self):
# #  #       return User.objects.filter(id=userid).only('friends')  # need to pass just User.friends list ...  how ?
#         userid = self.kwargs['u_id']
#         queryset = Profile.objects.filter(id=userid)
#     #queryset = Profile.objects.all().select_related('friends') # should grab friends only ?
    
