from django.db import models
from django.contrib.auth.models import User, AbstractUser


# user roles
class User(AbstractUser):
    is_student = models.BooleanField('student', default=False)
    is_teacher = models.BooleanField('teacher', default=False)
    is_customer_assistant = models.BooleanField('customer assistant', default=False)
    is_admin = models.BooleanField('admin', default=False)


# personal data
class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    surname = models.TextField()
    name = models.TextField()
    mobile_number = models.IntegerField()
    address = models.TextField()
    payment_id = models.IntegerField()
