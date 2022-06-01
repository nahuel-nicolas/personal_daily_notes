import datetime
from rest_framework import serializers
from .models import Date, Note

class DateSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        instance, _ = self.Meta.model.objects.get_or_create(**validated_data)
        return instance

    class Meta:
        model = Date
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        dateInstance, _ = Date.objects.get_or_create(date=datetime.date.today())
        validated_data["creation_date"] = dateInstance
        noteInstance = self.Meta.model.objects.create(**validated_data)
        return noteInstance

    class Meta:
        model = Note
        fields = '__all__'
        extra_kwargs = {
            'creation_date': {'validators': []},
        }