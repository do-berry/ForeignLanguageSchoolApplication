from rest_framework import serializers, permissions

from app.serializers import FindPersonSerializer, FindGroupAssignmentSerializer
from payment import models
from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    group_assignment = FindGroupAssignmentSerializer(required=True)
    assistant = FindPersonSerializer(required=True)

    class Meta:
        model = models.Payment
        fields = ('details', 'amount', 'paid', 'group_assignment', 'assistant',)

    def create(self, validated_data):
        assistant_data = validated_data.pop('assistant')
        assistant = FindPersonSerializer.find(FindPersonSerializer(), assistant_data)
        ga_data = validated_data.pop('group_assignment')
        ga = FindGroupAssignmentSerializer.find(FindGroupAssignmentSerializer(), ga_data)
        payment, created = Payment.objects.update_or_create(details=validated_data.pop('details'),
                                                            amount=validated_data.pop('amount'),
                                                            paid=validated_data.pop('paid'),
                                                            assistant=assistant,
                                                            group_assignment=ga)
        return created
