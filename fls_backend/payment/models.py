from django.db import models

from app.models import Person, GroupAssignment


class Payment(models.Model):
    details = models.TextField(default="")
    amount = models.FloatField(default=0.00)
    paid = models.BooleanField(default=False)
    group_assignment = models.ForeignKey(GroupAssignment, default=None, on_delete=models.CASCADE)
    approved = models.DateTimeField(auto_now=True)
    assistant = models.ForeignKey(Person, on_delete=models.CASCADE)
