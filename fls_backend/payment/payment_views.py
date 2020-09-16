from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from payment.serializers import PaymentSerializer


@api_view(['POST'])
def create_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        response = serializer.create(validated_data=request.data)
        return Response(response, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
