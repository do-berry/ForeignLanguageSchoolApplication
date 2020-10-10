from rest_framework import serializers, permissions

from app.serializers import FindPersonSerializer, FindLanguageSerializer
from payment import models
from payment.models import Payment
from school.serializers import FindGroupSerializer


class PaymentSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    person = FindPersonSerializer()
    group = FindGroupSerializer()

    class Meta:
        model = models.Payment
        fields = ('person', 'group', 'description', 'to_pay', 'paid', )

    def create(self, validated_data):
        person_data = validated_data.pop('person')
        person = FindPersonSerializer.find(FindPersonSerializer(), person_data)
        group_data = validated_data.pop('group')
        group = FindGroupSerializer.find(FindGroupSerializer(), group_data)
        payment, created = Payment.objects.update_or_create(person=person,
                                                            group=group,
                                                            description=validated_data.pop('description'),
                                                            to_pay=validated_data.pop('to_pay'),
                                                            paid=validated_data.pop('paid'))
        return created
