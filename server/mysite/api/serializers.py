from rest_framework import serializers
from .models import User, Loan

class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','firstName', 'lastName', 'email', 'phone', 'friends')

class LoanSerializer (serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ('id','payee', 'payor', 'date', 'amount', 'description','status')
