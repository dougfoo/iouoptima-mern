from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from .views import UserViewSet, LoanViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'loans', LoanViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
