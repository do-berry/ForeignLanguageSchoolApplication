from django.test import TestCase

from app.models import User, Person


class PersonTestCase(TestCase):
    @classmethod
    def setUp(cls):
        cls.user = User.objects.create(username="username", password="password", user_type="STUDENT")
        cls.person = Person.objects.create(name="test", surname="test", user=cls.user, mobile_number="123456789",
                                           address="test test")

    def test_information_fields(self):
        self.assertIsInstance(self.person.name, str)
        self.assertIsInstance(self.person.surname, str)
        self.assertIsInstance(self.person.mobile_number, str)
        self.assertIsInstance(self.person.address, str)

    def test_user_field(self):
        self.assertIsInstance(self.person.user, User)
