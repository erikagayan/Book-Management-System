from rest_framework import mixins, viewsets
from books.models import Book
from books.serializers import BookSerializer


class BookViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
