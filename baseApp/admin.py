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
