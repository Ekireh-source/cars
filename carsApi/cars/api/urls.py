from django.urls import path
from .views import CarsView, BidView

app_name ="cars"

urlpatterns = [
    path("", CarsView.as_view(), name="cars"),
    path("<int:pk>/", CarsView.as_view(), name="car-detail"),
    path("<int:car_id>/bids/", BidView.as_view(), name="submit-bid"),
    path("bids/", BidView.as_view(), name="list-bids"),
    
]