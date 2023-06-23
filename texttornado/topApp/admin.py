from django.contrib import admin
from topApp.models import Player, Comments, TypingDetails, TypingDetailsHistory
# Register your models here.

admin.site.register(Player)
admin.site.register(Comments)
admin.site.register(TypingDetails)
admin.site.register(TypingDetailsHistory)
