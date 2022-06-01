import datetime
import pytest
from personal_daily_notes_backend_app import models

@pytest.mark.django_db
def test_date_creation(client):
    dateObject = models.Date.objects.create(date=datetime.date.today())
    assert isinstance(dateObject.date, datetime.date) 

@pytest.mark.django_db
def test_note_creation(client):
    dateObject = models.Date.objects.create(date=datetime.date.today())
    noteObject = models.Note.objects.create(
        body="A", 
        creation_date=dateObject
    )
    assert noteObject.creation_date == dateObject