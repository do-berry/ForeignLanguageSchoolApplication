from rest_framework.test import APITestCase, APIClient


class SchoolAPITests(APITestCase):
    @classmethod
    def setUp(cls):
        cls.client = APIClient()

    def test_create_group(self):
        self.client.login(username='assistant', password='assistant')
        params = {
            "room": 123,
            "date_hour": "17:15:00",
            "date_day": "D4",
            "language": {
                "name": "GER",
                "level": "C1"
            },
            "cost": 66.6
        }
        response = self.client.post('/school/creategroup', params, format='json')
        self.assertEqual(response.status_code, 201, 'Expected Response Code 201, received {0} instead.'
                         .format(response.status_code))
