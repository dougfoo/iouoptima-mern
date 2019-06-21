from rest_framework import serializers
from .models import User, Loan

class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','firstName', 'lastName', 'email', 'phone', 'friends','loans')

class LoanSerializer (serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ('id','payee', 'payer', 'date', 'amount', 'description','status')
