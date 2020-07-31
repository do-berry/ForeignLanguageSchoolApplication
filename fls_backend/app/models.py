from django.contrib.auth.models import AbstractUser
from django.db import models


# user roles
class User(AbstractUser):
    username = models.CharField(max_length=16, unique=True)
    password = models.CharField(max_length=32)
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
