from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from cars.models import Car, Bid
from django.shortcuts import get_object_or_404
from .serializers import BidSerializer, CarSerializer, GetBidSerializer
from rest_framework.response import Response
from rest_framework import status



class CarsView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = CarSerializer
    
    def get(self, request, *args, **kwargs):
        try:
            cars = Car.objects.all()
            serializer = self.serializer_class(cars, many=True)
            response_data = {
            "success": True,
            "data": serializer.data
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Car.DoesNotExist:
            response_data = {
            "success": False,
            "message": "No cars",
            }

            return Response(response_data, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        make = serializer.validated_data['make']
        model = serializer.validated_data['model']
        year = serializer.validated_data['year']
        price = serializer.validated_data['price']
        description = serializer.validated_data['description']

        car = Car.objects.create(
            make=make,
            model=model,
            year=year,
            price=price,
            description=description
        )

        response_data = {
            "success": True,
            "message": "Car added successfully",
        }

        return Response(response_data, status=status.HTTP_201_CREATED)

    def put(self, request, *args, **kwargs):
        car = get_object_or_404(Car, id=kwargs.get('pk')) 
        serializer = CarSerializer(car, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    def delete(self, request, *args, **kwargs):
        car = get_object_or_404(Car, id=kwargs.get('pk'))  
        car.delete()
        return Response({"message": "Car deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    
    

class BidView(APIView):
    
    permission_classes = [IsAuthenticated]
    serializer_class = BidSerializer

    def post(self, request, car_id):
        user = request.user
        car = get_object_or_404(Car, id=car_id)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        amount = serializer.validated_data['amount']
        submited_bid = Bid.objects.create(
            amount = amount,
            car = car,
            bidder_name = user,
        )

        response_data = {
            "success": True,
            "message": "Bid submitted succesfully",
        }

        return Response(response_data, status=status.HTTP_201_CREATED)
    
    def get(self, request, *args, **kwargs):
        try:
            cars = Bid.objects.all()
            serializer = GetBidSerializer(cars, many=True)
            response_data = {
            "success": True,
            "data": serializer.data
            }

            return Response(response_data, status=status.HTTP_200_OK)
        except Bid.DoesNotExist:
            response_data = {
            "success": False,
            "message": "No bids",
            }

            return Response(response_data, status=status.HTTP_404_NOT_FOUND)