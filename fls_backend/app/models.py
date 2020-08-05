from django.contrib.auth.models import AbstractUser
from django.db import models

# user roles
from school.models import Group


class User(AbstractUser):
    username = models.CharField(max_length=16, unique=True)
    password = models.CharField(max_length=32)
    is_student = models.BooleanField('student', default=False)
    is_teacher = models.BooleanField('teacher', default=False)
    is_customer_assistant = models.BooleanField('customer assistant', default=False)
    is_admin = models.BooleanField('admin', default=False)


# app data
class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    surname = models.TextField(null=True, blank=True)
    name = models.TextField(null=True, blank=True)
    mobile_number = models.IntegerField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)


class GroupAssignment(models.Model):
    person = models.OneToOneField(Person, on_delete=models.CASCADE)
    group = models.OneToOneField(Group, on_delete=models.CASCADE)
    assigment_date = models.DateTimeField(auto_now=True, null=True, blank=True)
