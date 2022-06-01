import datetime
import pytest
from personal_daily_notes_backend_app import models

@pytest.mark.django_db
def test_get_home(client):
    response = client.get(f"//")
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_dates(client):
    response = client.get(f"/date/")
    assert response.status_code == 200

@pytest.mark.django_db
def test_get_notes(client):
    response = client.get(f"/note/")
    assert response.status_code == 200

@pytest.mark.django_db
def test_notes_creation_date_group(client):
    x_date = datetime.date(2020, 5, 10)
    y_date = datetime.date(2021, 7, 12)
    for currentDate in [x_date, y_date]:
        currentDateObject = models.Date.objects.create(date=currentDate)
        for currentRandomBody in ["A", "B"]:
            models.Note.objects.create(body=currentRandomBody, creation_date=currentDateObject)
    response = client.get(f"/note/")
    assert response.status_code == 200
    x_date_object = response.data[x_date.strftime("%Y-%m-%d")]
    y_date_object = response.data[y_date.strftime("%Y-%m-%d")]
    assert x_date_object[1]["creation_date"] == x_date
    assert x_date_object[2]["creation_date"] == x_date
    assert y_date_object[3]["creation_date"] == y_date
    assert y_date_object[4]["creation_date"] == y_date

@pytest.mark.django_db
def test_get_date(client):
    dateObject = models.Date.objects.create(date=datetime.date.today())
    stringDate = dateObject.date.strftime("%Y-%m-%d")
    url = f"/date/{stringDate}/"
    response = client.get(url)
    assert response.data["date"] == stringDate

@pytest.mark.django_db
def test_get_note(client):
    dateObject = models.Date.objects.create(date=datetime.date.today())
    noteObject = models.Note.objects.create(body="A", creation_date=dateObject)
    response = client.get(f"/note/{noteObject.id}/")
    assert response.data["id"] == noteObject.id