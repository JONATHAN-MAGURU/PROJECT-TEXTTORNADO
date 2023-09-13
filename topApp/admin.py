from django.contrib import admin
from topApp.models import Player, Comments, TypingDetails, TypingDetailsHistory,Tickets, TicketPurchase, LeaderboardHistory

admin.site.register(Player)
admin.site.register(Comments)
admin.site.register(TypingDetails)
admin.site.register(TypingDetailsHistory)
admin.site.register(Tickets)
admin.site.register(TicketPurchase)
admin.site.register(LeaderboardHistory)