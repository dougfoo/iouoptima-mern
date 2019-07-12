from django.shortcuts import render

from .models import User, Loan
from .serializers import UserSerializer, LoanSerializer, FriendSerializer
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
    serializer_class = UserSerializer
    queryset = User.objects.all().values('friends')

#     def get_queryset(self):
#         userid = self.kwargs['u_id']
#  #       return User.objects.filter(id=userid).only('friends')  # need to pass just User.friends list ...  how ?
#         q = User.objects.filter(id=userid).values('email')
#         print (str(q.query))
#         return q

