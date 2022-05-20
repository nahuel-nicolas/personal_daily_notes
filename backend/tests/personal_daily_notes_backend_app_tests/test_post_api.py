import datetime
import pytest
from personal_daily_notes_backend_app import models

def getResponseID(response):
    assert response.status_code == 201
    return response.data["id"]

def getStringDateFromResponse(client, stringDate):
    response = client.post('/date/', dict(date=stringDate))
    assert response.status_code == 201
    return response.data["date"]

def getNoteID(client, noteData):
    response = client.post('/note/', noteData)
    return getResponseID(response)

@pytest.mark.django_db
def test_post_date(client):
    todayDateString = datetime.date.today().strftime("%Y-%m-%d")
    stringDateFromResponse = getStringDateFromResponse(client, todayDateString)
    dateObjectInDatabase = models.Date.objects.get(date=datetime.date.today())
    assert stringDateFromResponse == dateObjectInDatabase.date.strftime("%Y-%m-%d")

@pytest.mark.django_db
def test_post_note_with_date(client):
    models.Date.objects.create(date=datetime.date.today())
    todayDateString = datetime.date.today().strftime("%Y-%m-%d")
    noteData = dict(body="A", creation_date=todayDateString)
    response = client.post('/note/', noteData)
    assert response.status_code == 201
    assert response.data["creation_date"].strftime("%Y-%m-%d") == todayDateString

@pytest.mark.django_db
def test_post_note_without_date(client):
    todayDateString = datetime.date.today().strftime("%Y-%m-%d")
    noteData = dict(body="A")
    response = client.post('/note/', noteData)
    assert response.status_code == 201
    assert response.data["creation_date"].strftime("%Y-%m-%d") == todayDateString