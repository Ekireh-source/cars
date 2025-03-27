from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import User


SOLD = "SOLD"
AVAILABLE = "AVAILABLE"

STATUS_CHOICES = [
    (SOLD, _("sold")),
    (AVAILABLE, _("available"))
    
]


class Car(models.Model):
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(default=AVAILABLE, choices=STATUS_CHOICES, max_length=9)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.year} {self.make} {self.model}"


class Bid(models.Model):
    car = models.ForeignKey(Car, related_name='bids', on_delete=models.CASCADE)
    bidder_name = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.bidder_name} bid {self.amount} on {self.car}" 