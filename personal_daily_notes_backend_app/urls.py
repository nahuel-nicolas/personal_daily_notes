from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('date', views.DateViewSet)
router.register('note', views.NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('notesByDate/<str:date>/', views.NotesByDate.as_view())
]