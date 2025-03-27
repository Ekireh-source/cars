import logging
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator
from django.conf import settings
from accounts.models import (
    User,
    
   
)
from django.db.models import Q

from utils.validations import validate_password

logger = logging.getLogger(__name__)


class CreateUserSerializer(serializers.ModelSerializer):

    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)
    email = serializers.EmailField(
        required=True,
        validators=[
            UniqueValidator(
                queryset=User.objects.all(), message="Email already in use!"
            )
        ],
    )
   
    password = serializers.CharField(
        validators=[validate_password], required=True
    )
    confirm_password = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "email",
            "password",
            "confirm_password",
            
        ]

    def create(self, validated_data):
        """
        Create and return a new User instance
        """
       
        user = User.objects.create_user(**validated_data)
        logger.info(
            f"[ACCOUNTS] Successfully created user account for user {user.id}"
        )
        


        return user

    def validate(self, data):
        """
        Method to validate request data
        """
        confirm_password = data.pop("confirm_password")
        if data.get("password") != confirm_password:
            raise serializers.ValidationError({"password": "Passwords mismatch"})

        elif len(data.get("password")) < 8:
            raise serializers.ValidationError({"password": "Password should be atleast 8 characters long"})


        return data
    

class EmailTokenObtainSerializer(TokenObtainPairSerializer):
    username_field = User.EMAIL_FIELD


class LoginSerializer(EmailTokenObtainSerializer):
    tokens = serializers.CharField(read_only=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)

    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        # this method authenticates and add user to self if valid
        tokens = super().validate(attrs)
        user = self.user
        return tokens


class LoginResponseSerializer(serializers.Serializer):
    access_token = serializers.CharField(read_only=True)
    refresh_token = serializers.EmailField(read_only=True)



class UserConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'user_role',]