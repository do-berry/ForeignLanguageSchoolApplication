import json

from django.db.models import Q
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

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
    for payment in request.data:
        Payment.objects.filter(id=payment['id']).update(paid=payment['paid'])
    return Response("updated", status=status.HTTP_200_OK)


@api_view(['POST'])
def find_payments_by_person_and_group(request):
    payments = Payment.objects.filter(Q(student__id=request.data['person'])).distinct()
    result = []
    for payment in payments:
        result.append({'details': payment.details, 'amount': payment.amount, 'paid': payment.paid,
                       'student': (payment.student.name + " " + payment.student.surname),
                       'approved': str(payment.approved), 'assistant': (payment.assistant.name +
                                                                        " " + payment.assistant.surname)})
    return Response(json.loads(json.dumps(result)), status=status.HTTP_200_OK)


@api_view(['DELETE'])
def delete_payment(request):
    Payment.objects.filter(id=request.data['id']).delete()
    return Response("deleted", status=status.HTTP_200_OK)

