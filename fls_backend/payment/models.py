from django.db import models

from app.models import Person
from school.models import Language


class Payment(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    language = models.ForeignKey(Language, on_delete=models.CASCADE)
    paid = models.FloatField()
