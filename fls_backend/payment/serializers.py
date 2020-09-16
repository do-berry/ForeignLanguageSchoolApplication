from rest_framework import serializers, permissions

from app.serializers import FindPersonSerializer, FindLanguageSerializer
from payment import models
from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    permission_classes = (permissions.AllowAny,)
    person = FindPersonSerializer()
    language = FindLanguageSerializer()

    class Meta:
        model = models.Payment
        fields = ('person', 'language', 'paid',)

    def create(self, validated_data):
        person_data = validated_data.pop('person')
        person = FindPersonSerializer.find(FindPersonSerializer(), person_data)
        language_data = validated_data.pop('language')
        language = FindLanguageSerializer.find(FindLanguageSerializer(), language_data)
        payment, created = Payment.objects.update_or_create(person=person,
                                                            language=language,
                                                            paid=validated_data.pop('paid'))
        return created
