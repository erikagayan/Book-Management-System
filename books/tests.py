# books/tests.py
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from books.models import Book


class BookTests(APITestCase):

    def setUp(self):
        self.valid_data = {
            "title": "Test Book",
            "author": "Author Name",
            "published_date": "2023-01-01",
            "isbn": "1234567890123",
            "pages": 100,
        }
        self.book = Book.objects.create(**self.valid_data)
        self.url = reverse("book-list")

    def test_create_book(self):
        response = self.client.post(self.url, self.valid_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 2)
        self.assertEqual(Book.objects.get(id=response.data["id"]).title,
                         "Test Book")

    def test_get_books(self):
        response = self.client.get(self.url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], self.book.title)

    def test_get_book_detail(self):
        url = reverse("book-detail", args=[self.book.id])
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.book.title)

    def test_update_book(self):
        url = reverse("book-detail", args=[self.book.id])
        updated_data = self.valid_data.copy()
        updated_data["title"] = "Updated Title"
        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Book.objects.get(id=self.book.id).title,
                         "Updated Title")

    def test_delete_book(self):
        url = reverse("book-detail", args=[self.book.id])
        response = self.client.delete(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Book.objects.count(), 0)
