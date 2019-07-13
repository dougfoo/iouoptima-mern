# # users/forms.py
# from django import forms
# from django.contrib.auth.forms import UserCreationForm, UserChangeForm
# from .models import CustomUser

# class CustomUserCreationForm(UserCreationForm):
#     email2 = forms.EmailField(required=True)

#     class Meta:
#         model = CustomUser
#         fields = ('username', 'email2', 'firstName')

#     def save(self, commit=True):
#         user = super(CustomUserCreationForm, self).save(commit=False)
#         user.email2 = self.cleaned_data["email2"]
#         if commit:
#             user.save()
#         return user

# class CustomUserChangeForm(UserChangeForm):
#     class Meta:
#         model = CustomUser
#         fields = ('username', 'email2', 'firstName')