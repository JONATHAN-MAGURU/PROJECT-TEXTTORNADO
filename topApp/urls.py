from django.urls import path
from topApp import views

urlpatterns = [
    path("", views.aunth, name="aunth"),
    path("ttd_user_signin/", views.ttd_user_signin, name="ttd_user_signin"),
    path("ttd_user_login/", views.ttd_user_login, name="ttd_user_login"),
    path("resetPassword/", views.resetPassword, name="resetPassword"),
    path("terms/", views.terms, name="terms"),
    path("policy/", views.policy, name="policy"),
    path("ttd_user_login/amargerdon_e1", views.amargerdon_e1, name="amargerdon_e1"),
    path("v_player", views.v_player, name="v_player"),
    path("second_player_data", views.second_player_data, name="second_player_data"),
    path("sending_comments", views.sending_comments, name="sending_comments"),
    path("get_comments", views.get_comments, name="get_comments"),
    path("get_my_data", views.get_my_data, name="get_my_data"),
    path("typing_details", views.typing_details, name="typing_details"),
    path("get_test_details", views.get_test_details, name="get_test_details"),
    path("get_history", views.get_history, name="get_history"),
    path("getEndEvents", views.getEndEvents, name="getEndEvents"),
    path("getNextEvents", views.getNextEvents, name="getNextEvents"),
    path("verifyPhoneNumber", views.verifyPhoneNumber, name="verifyPhoneNumber"),
    path("checkUsername", views.checkUsername, name="checkUsername"),
    path("searchAccount", views.searchAccount, name="searchAccount"),
    path("verifyOtp", views.verifyOtp, name="verifyOtp"),
    path("verifyOtpReset", views.verifyOtpReset, name="verifyOtpReset"),
    path("resetPassword2", views.resetPassword2, name="resetPassword2"),
    path("checkNumber", views.checkNumber, name="checkNumber"),
    path("get_ticket_data/", views.get_ticket_data, name="get_ticket_data"),
    path("updateTickets", views.updateTickets, name="updateTickets"),
    path("processPayment", views.processPayment, name="processPayment"),
    path("setToOld", views.setToOld, name="setToOld"),
    path("setToseen", views.setToseen, name="setToseen"),
    path("leaderBoardHistory", views.leaderBoardHistory, name="leaderBoardHistory"),
    path("leaderBoardHistory2", views.leaderBoardHistory2, name="leaderBoardHistory2"),
    path("leaderBoardHistory3", views.leaderBoardHistory3, name="leaderBoardHistory3"),
    path("update_user_status", views.update_user_status, name="update_user_status"),
    path(
        "count_online_players", views.count_online_players, name="count_online_players"
    ),
    path("shareTickets", views.shareTickets, name="shareTickets"),
    path("claimTickets", views.claimTickets, name="claimTickets"),
    path("claimTickets2", views.claimTickets2, name="claimTickets2"),
    path("get_notifications", views.get_notifications, name="get_notifications"),
    path("sending_concern", views.sending_concern, name="sending_concern"),
    path("get_concern2", views.get_concern2, name="get_concern2"),
    path(
        "sending_concern_response",
        views.sending_concern_response,
        name="sending_concern_response",
    ),
    path("clearNotification", views.clearNotification, name="clearNotification"),
    path("getTicketsPrices2", views.getTicketsPrices2, name="getTicketsPrices2"),
    path("getPrizes", views.getPrizes, name="getPrizes"),
    path("getQuest", views.getQuest, name="getQuest"),
]
