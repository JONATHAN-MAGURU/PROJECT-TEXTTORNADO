from django.contrib import admin
from topApp.models import (
    Player,
    Subscription,
    Support,
    Comments,
    Notification,
    TypingDetails,
    TypingDetailsHistory,
    Tickets,
    TicketPurchase,
    LeaderboardHistory,
    Typing_parttern,
    Typing_partterns_History,
    VerificationTokens,
)

admin.site.register(Player)
admin.site.register(Comments)
admin.site.register(TypingDetails)
admin.site.register(TypingDetailsHistory)
admin.site.register(Tickets)
admin.site.register(TicketPurchase)
admin.site.register(LeaderboardHistory)
admin.site.register(Notification)
admin.site.register(Support)
admin.site.register(Subscription)
admin.site.register(Typing_parttern)
admin.site.register(Typing_partterns_History)
admin.site.register(VerificationTokens)
