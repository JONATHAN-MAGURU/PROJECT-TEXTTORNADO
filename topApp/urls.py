from django.urls import path
from topApp import views 

urlpatterns = [
    path('', views.ttd_user_login, name='ttd_user_login'),
    path('ttd_user_signin/', views.ttd_user_signin, name='ttd_user_signin'),
    path('ttd_user_homepage', views.ttd_user_homepage, name='ttd_user_homepage'),
    path('v_player', views.v_player, name='v_player'),
    path('v_player2', views.v_player2, name='v_player2'),
    path('second_player_data', views.second_player_data, name='second_player_data'),
    path('sending_comments', views.sending_comments, name='sending_comments'),
    path('get_comments', views.get_comments, name='get_comments'),
    path('get_my_data', views.get_my_data, name='get_my_data'),
    path('typing_details', views.typing_details, name='typing_details'),
    path('get_test_details', views.get_test_details, name='get_test_details'),
    path('get_history', views.get_history, name='get_history'),
    path('getEndEvents', views.getEndEvents, name='getEndEvents'),

]