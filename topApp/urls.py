from django.urls import path
from topApp import views 

urlpatterns = [
    path('', views.ttd_user_login, name='ttd_user_login'),
    path('ttd_user_signin/', views.ttd_user_signin, name='ttd_user_signin'),
    path('resetPassword/', views.resetPassword, name='resetPassword'),
    path('session', views.session, name='session'),
    path('v_player', views.v_player, name='v_player'),
    path('second_player_data', views.second_player_data, name='second_player_data'),
    path('sending_comments', views.sending_comments, name='sending_comments'),
    path('get_comments', views.get_comments, name='get_comments'),
    path('get_my_data', views.get_my_data, name='get_my_data'),
    path('typing_details', views.typing_details, name='typing_details'),
    path('get_test_details', views.get_test_details, name='get_test_details'),
    path('get_history', views.get_history, name='get_history'),
    path('getEndEvents', views.getEndEvents, name='getEndEvents'),
    path('getNextEvents', views.getNextEvents, name='getNextEvents'),
    path('verifyPhoneNumber', views.verifyPhoneNumber, name='verifyPhoneNumber'),
    path('checkUsername', views.checkUsername, name='checkUsername'),
    path('searchAccount', views.searchAccount, name='searchAccount'),
    path('verifyOtp', views.verifyOtp, name='verifyOtp'),
    path('verifyOtpReset', views.verifyOtpReset, name='verifyOtpReset'),
    path('resetPassword2', views.resetPassword2, name='resetPassword2'),
    path('checkNumber', views.checkNumber, name='checkNumber'),

]