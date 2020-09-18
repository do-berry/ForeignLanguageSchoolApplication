from django.db import models

from app.models import Person
from school.models import Language, Group


class Payment(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=0)
    paid = models.FloatField()
