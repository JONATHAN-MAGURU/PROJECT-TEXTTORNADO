from django.urls import path
from topApp import views 

urlpatterns = [
    path('', views.ttd_user_login, name='ttd_user_login'),
    path('ttd_user_signin/', views.ttd_user_signin, name='ttd_user_signin'),
    path('ttd_user_homepage/', views.ttd_user_homepage, name='ttd_user_homepage'),
    path('v_player', views.v_player, name='v_player'),
    path('v_player2', views.v_player2, name='v_player2'),
]