from rest_framework import serializers
from .models import CustomUser, Loan

# non-recursive version (not including friends.friends.friends....)
class FriendSerializer (serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    firstName = serializers.CharField(max_length=40)
    lastName = serializers.CharField(max_length=40)
    phone = serializers.CharField(max_length=40)

#normal version
class UserSerializer (serializers.ModelSerializer):
    friends = FriendSerializer(many=True, read_only=False)
    class Meta:
        model = CustomUser
        fields = ('__all__')

class LoanSerializer (serializers.ModelSerializer):
    payee_email = serializers.ReadOnlyField(source='payee.email')
    payor_email = serializers.ReadOnlyField(source='payor.email')

    class Meta:
        model = Loan
        fields = ('__all__')
