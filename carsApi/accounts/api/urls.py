from accounts.api.views import (
    CreateUserAPIView, 
    LoginAPIView,
    UserConfigAPIView
)
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

app_name = "auth"

urlpatterns = [
    path("register/", CreateUserAPIView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("refresh/token/", TokenRefreshView.as_view(), name="refresh_token"),
    path(
        "get-user-config/",
        view=UserConfigAPIView.as_view(),
        name="get_user_config",
    ),
    
    
   
]
