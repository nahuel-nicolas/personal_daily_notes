from rest_framework.response import Response
from rest_framework import viewsets
from .models import Date, Note
from .serializers import DateSerializer, NoteSerializer

class DateViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

    def list(self, request):
        queryset = Note.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        list_of_objects = serializer.data
        object_of_objects = {}
        custom_search_key = "creation_date"
        for current_object in list_of_objects:
            current_search_key_value = current_object[custom_search_key].strftime("%Y-%m-%d")
            if current_search_key_value in object_of_objects:
               object_of_objects[current_search_key_value][current_object["id"]] = current_object
            else:
                object_of_objects[current_search_key_value] = {current_object["id"]: current_object}
        return Response(object_of_objects)
