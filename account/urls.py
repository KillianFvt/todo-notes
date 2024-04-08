from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name="register"),
    path('login/', views.account_login, name="login"),
    path('logout/', views.account_logout, name="logout"),
    path('get-current-user/', views.get_user, name="get_user"),
]
