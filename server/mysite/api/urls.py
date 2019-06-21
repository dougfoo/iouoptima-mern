from django.urls import path

from . import views

urlpatterns = [
    path('', views.UserViewSet, name='User'),
    path('', views.LoanViewSet, name='Loan'),
]
