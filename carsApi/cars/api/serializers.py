from rest_framework import serializers
from cars.models import Car, Bid


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'



class BidSerializer(serializers.Serializer):
   amount = serializers.IntegerField()

   


class GetBidSerializer(serializers.ModelSerializer):

   class Meta:
        model = Bid
        fields = '__all__'
        