from rest_framework import serializers, permissions

from app.serializers import FindPersonSerializer
from payment import models
from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    person = FindPersonSerializer()

    class Meta:
        model = models.Payment
        fields = ('person', 'description', 'to_pay', 'paid', )

    def create(self, validated_data):
        person_data = validated_data.pop('person')
        person = FindPersonSerializer.find(FindPersonSerializer(), person_data)
        payment, created = Payment.objects.update_or_create(person=person,
                                                            description=validated_data.pop('description'),
                                                            to_pay=validated_data.pop('to_pay'),
                                                            paid=validated_data.pop('paid'))
        return created
