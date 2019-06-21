from django.db import models

# Create your models here.

class Loan(models.Model):
    LOAN_STATUS = (
        ('P', 'Pending'),
        ('A', 'Active'),
        ('C', 'Cancelled'),
        ('D', 'Done'),
    )
 
    id = models.IntegerField(primary_key=True)
#    payee = models.ForeignKey(User, on_delete=models.CASCADE)
#    payer = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    amount = models.DecimalField(decimal_places=2, max_digits=12)
    description = models.TextField()
    status = models.CharField(max_length=1, choices=LOAN_STATUS)

    def __str__(self):
        return str(self.id) + ', ' + str(self.amount) + ': ' + str(self.payee)

class User(models.Model):
    id = models.IntegerField(primary_key=True)
    firstName = models.CharField(max_length=40)
    lastName = models.CharField(max_length=40)
    email = models.CharField(max_length=60)  
    phone = models.CharField(max_length=60)  
#    friends = models.ManyToManyField(User)
    loans = models.ManyToManyField(Loan)

    def __str__(self):
        return str(self.id) + ',' + self.email + ': ' + str(self.loans)


