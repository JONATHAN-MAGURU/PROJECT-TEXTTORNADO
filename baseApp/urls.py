from django.urls import path
from baseApp import views




urlpatterns = [
     path('ttd_admin_login/ttd_admin_homepage', views.ttd_admin_homepage, name="ttd_admin_homepage"),
    path('ttd_admin_login/', views.ttd_admin_login, name="ttd_admin_login"),
    path('ttd_admin_signin/', views.ttd_admin_signin, name="ttd_admin_signin"),
   
]