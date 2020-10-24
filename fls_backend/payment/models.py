from django.db import models

from app.models import Person


class Payment(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    description = models.TextField(default="")
    to_pay = models.FloatField(default=0.00)
    paid = models.BooleanField(default=False)
