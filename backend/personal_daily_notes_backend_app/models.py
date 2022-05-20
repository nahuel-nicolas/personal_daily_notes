from django.db import models

class Date(models.Model):
    date = models.DateField(primary_key=True)

class Note(models.Model):
    body = models.TextField()
    creation_date = models.ForeignKey(Date, on_delete=models.CASCADE, null=True)
    creation_datetime = models.DateTimeField(auto_now_add=True)