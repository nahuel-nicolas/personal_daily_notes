from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Date, Note
from .serializers import DateSerializer, NoteSerializer

class DateViewSet(viewsets.ModelViewSet):
    queryset = Date.objects.all()
    serializer_class = DateSerializer

    def list(self, request):
        queryset = Date.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        list_of_objects = serializer.data
        dates = {"extremeDates": [list_of_objects[0]["date"], list_of_objects[-1]["date"]]}
        for current_object in list_of_objects:
            dates[current_object["date"]] = True
        return Response(dates)

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

class NotesByDate(APIView):
    def get(self, request, date, format=None):
        currentDateObject = get_object_or_404(Date, date=date)
        currentDateNotes = Note.objects.filter(creation_date=currentDateObject)
        list_of_objects = NoteSerializer(currentDateNotes, many=True).data
        # object_of_objects = {}
        # search_key = "id"
        # for current_object in list_of_objects:
        #     object_of_objects[current_object[search_key]] = current_object
        # return Response(object_of_objects)
        return Response(list_of_objects)