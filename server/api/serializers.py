from rest_framework import serializers
from .models import User, Loan

class UserSerializer (serializers.ModelSerializer):
 #   friends = serializers.StringRelatedField(many=True)

    friends = serializers.SlugRelatedField(
        queryset=User.objects.all(),
        many=True,
        read_only=False,   #queryset needed?
        allow_null=True,
        slug_field='email'
     )

    class Meta:
        model = User
        fields = ('__all__')

class LoanSerializer (serializers.ModelSerializer):
    payee_email = serializers.ReadOnlyField(source='payee.email')
    payor_email = serializers.ReadOnlyField(source='payor.email')

    class Meta:
        model = Loan
        fields = ('__all__')
