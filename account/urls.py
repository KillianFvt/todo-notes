from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name="register"),
    path('logout/', views.account_logout, name="logout"),
    path('get-current-user/', views.get_user, name="get_user"),
]
