from rest_framework import serializers
from .models import User, Loan

class UserSerializer (serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','firstName', 'lastName', 'email', 'password','phone', 'friends')

class LoanSerializer (serializers.ModelSerializer):
    payee_email = serializers.CharField(source='payee.email')
    payor_email = serializers.CharField(source='payor.email')

    class Meta:
        model = Loan
        fields = ('id','payee','payee_email', 'payor', 'payor_email', 'date', 'amount', 'description','status')
    #    read_only_fields = ('payee_email','payor_email')

    # def create(self, validated_data):
    #     return Loan.objects.create(**validated_data)
