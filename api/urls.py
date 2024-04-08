from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name="root"),
    path('notes/', views.get_notes, name="all_notes"),
    path('note/add/', views.add_note, name="add_note"),
    path('note/<str:note_pk>/update/', views.update_note, name="update_note"),
    path('note/<str:note_pk>/delete/', views.delete_note, name="delete_note"),
    path('note/<str:note_pk>/', views.get_note, name="get_note"),
]
