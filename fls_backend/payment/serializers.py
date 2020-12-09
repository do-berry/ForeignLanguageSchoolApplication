from rest_framework import serializers, permissions

from app.serializers import FindPersonSerializer, FindGroupAssignmentSerializer, \
    FindGroupAssignmentByPersonAndGroupSerializer
from payment import models
from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    student = FindPersonSerializer(required=True)
    assistant = FindPersonSerializer(required=True)

    class Meta:
        model = models.Payment
        fields = ('details', 'amount', 'paid', 'student', 'assistant',)

    def create(self, validated_data):
        assistant_data = validated_data.pop('assistant')
        assistant = FindPersonSerializer.find(FindPersonSerializer(), assistant_data)
        student_data = validated_data.pop('student')
        student = FindPersonSerializer.find(FindPersonSerializer(), student_data)
        payment, created = Payment.objects.update_or_create(details=validated_data.pop('details'),
                                                            amount=validated_data.pop('amount'),
                                                            paid=validated_data.pop('paid'),
                                                            assistant=assistant,
                                                            student=student)
        return created
