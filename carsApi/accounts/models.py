import decimal
import logging
import random
import string
import uuid
# from cities.models import Country # noqa
from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from rest_framework_simplejwt.tokens import RefreshToken
from accounts.managers import CustomUserManager
from django.db.models import Sum

logger = logging.getLogger(__name__)


COMPANY = "COMPANY"
CUSTOMER = "CUSTOMER"

USER_ROLES = [
    (COMPANY, _("company")),
    (CUSTOMER, _("customer"))
]


class TimestampMixin(models.Model):
    """
    Model mixin that provides timestamping fields.
    """

    create_date = models.DateTimeField("date created", auto_now_add=True)
    modify_date = models.DateTimeField("date modified", auto_now=True)

    class Meta:
        abstract = True


class User(TimestampMixin, AbstractUser):
    """
    Model class that extends the default User model
    """
    

    username = None
    email = models.EmailField(_("email_address"), unique=True)
    user_role = models.CharField(default=CUSTOMER, choices=USER_ROLES, max_length=8)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()

    def __str__(self):
        """
        Returns a string representation of the User.
        """
        return f"{self.first_name} {self.last_name} {self.email}"

    @property
    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }









