from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from .views import ProfileViewSet, LoanViewSet
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView,TokenVerifyView

router = routers.DefaultRouter()
router.register(r'users', ProfileViewSet)
router.register(r'loans', LoanViewSet)

urlpatterns = [
    # re_path(r'^friends/(?P<u_id>.+)/$', FriendList.as_view()),
    # re_path(r'^friends/$', FriendList.as_view()),
    re_path(r'^api/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path(r'^api/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r'^api/token/verify/$', TokenVerifyView.as_view(), name='token_verify'),
    path('', include(router.urls)),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
]
