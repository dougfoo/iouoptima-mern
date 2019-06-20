from rest_framework import serializers
from loans.models import Loan


class LoanSerializer (serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = ('id','payee', 'payer', 'date', 'amount', 'description','status')

class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','firstName', 'lastName', 'email', 'phone', 'friends','loans')
