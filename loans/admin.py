from django.contrib import admin

# Register your models here.

from .models import Loan, User

admin.site.register(Loan)
admin.site.register(User)
