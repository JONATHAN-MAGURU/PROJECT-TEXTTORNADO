from django.contrib import admin
from baseApp.models import (
    Admins_details,
    Leaderboard,
    Aunthaticate,
    Typing_testing,
    Variant_paragraphs,
    Frontend,
    EndEvent,
    NextEvent,
    TypingArea,
    Event1,
    Event2,
    Countdown,
    Countdown2,
    TextBehaviour,
    SubscriptionPrice,
)


admin.site.register(Admins_details)
admin.site.register(Aunthaticate)
admin.site.register(Typing_testing)
admin.site.register(Variant_paragraphs)
admin.site.register(Frontend)
admin.site.register(EndEvent)
admin.site.register(NextEvent)
admin.site.register(Leaderboard)
admin.site.register(TypingArea)
admin.site.register(Event1)
admin.site.register(Event2)
admin.site.register(Countdown)
admin.site.register(Countdown2)
admin.site.register(TextBehaviour)
admin.site.register(SubscriptionPrice)
