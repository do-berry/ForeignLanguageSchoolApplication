import json

from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from django.core import serializers

from payment.models import Payment
from payment.serializers import PaymentSerializer


@api_view(['POST'])
def create_payment(request):
    serializer = PaymentSerializer(data=request.data)
    if serializer.is_valid():
        response = serializer.create(validated_data=request.data)
        return Response(response, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PUT'])
def set_paid(request):
    Payment.objects.filter(id=request.data['id']).update(paid=request.data['paid'])
    return Response("updated", status=status.HTTP_200_OK)


@api_view(['POST'])
def find_payments_by_person_and_group(request):
    payments = Payment.objects.filter(Q(person=request.data['person']) & Q(group=request.data['group']))
    payments_to_return = serializers.serialize('json', payments)
    return Response(json.loads(payments_to_return), status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_payment(request):
    Payment.objects.filter(id=request.data['id']).delete()
    return Response("deleted", status=status.HTTP_200_OK)

