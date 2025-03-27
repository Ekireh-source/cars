import logging
from six import text_type
from django.utils.encoding import force_str as force_text
from django.conf import settings
from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
)
from rest_framework.views import APIView
from drf_yasg2.utils import swagger_auto_schema
from accounts.api.serializers import (
    CreateUserSerializer,
    LoginSerializer,
    LoginResponseSerializer,
    UserConfigSerializer
   
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response

from accounts.models import User

from django.db import connections
from django.db.utils import OperationalError
from django.db.models import Q

logger = logging.getLogger(__name__)

PASSWORD_RESET_SUBJECT = "Sunrepo: Reset Your Password"


class LoginAPIView(TokenObtainPairView):
    """
    Login API. Expects an email and password
    :returns: access and refresh token
    """

    serializer_class = LoginSerializer

    @swagger_auto_schema(responses={200: LoginResponseSerializer()})
    def post(self, request, *args, **kwargs):

        return super().post(request, *args, **kwargs)


class CreateUserAPIView(CreateAPIView):
    """
    API view for registering a user
    """

    permission_classes = (AllowAny,)
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        response_data = {
            "success": True,
            "message": "User registered successfully!",
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
    

class UserConfigAPIView(APIView):
    permission_classes = [
        IsAuthenticated
    ]
    serializer_class = UserConfigSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
