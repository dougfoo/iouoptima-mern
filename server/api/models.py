from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    id = models.AutoField(primary_key=True)   # prob can delete this
    firstName = models.CharField(max_length=40)
    lastName = models.CharField(max_length=40)
    email2 = models.CharField(max_length=60, unique=True)  
    password = models.CharField(max_length=60)
    phone = models.CharField(max_length=60)  
    friends = models.ManyToManyField("self", blank=True)

    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        if created:
            Profile.objects.create(user=instance)
        instance.profile.save()

    def __str__(self):
        return str(self.id) + ',' + self.firstName 

class Loan(models.Model):
    LOAN_STATUS = (
        ('P', 'Pending'),
        ('A', 'Active'),
        ('C', 'Cancelled'),
        ('D', 'Done'),
    )
 
    id = models.AutoField(primary_key=True)
    payee = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='+')
    payor = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='+')
    date = models.DateField(auto_now_add=True)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    description = models.TextField()
    status = models.CharField(max_length=1, choices=LOAN_STATUS)

    def __str__(self):
        return str(self.id) + ', ' + str(self.amount) + ': ' + str(self.payee)



