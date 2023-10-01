from django.db import models

# Create your models here.
class Admins_details(models.Model):
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    passw = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    emails = models.CharField(max_length=100)
    admin_id = models.IntegerField(default=57473172877);
    

class Aunthaticate(models.Model):
    v_code = models.CharField(max_length=50)
    
class Typing_testing(models.Model):
    test = models.CharField(max_length=1000000);
    test_id = models.IntegerField();

class Variant_paragraphs(models.Model):
    variant_p = models.CharField(max_length=1000000, default="")
    variant_id = models.IntegerField(default=0)

class Frontend(models.Model):
    FrontendId = models.IntegerField(default=5747)


class Leaderboard(models.Model):
    leaderBoardId = models.IntegerField(default=5747)


class TypingArea(models.Model):
    typingAreaId = models.IntegerField(default=5747)


class EndEvent(models.Model):
    endEventId = models.IntegerField(default=5747)

class NextEvent(models.Model):
   nextEventId = models.IntegerField(default=5747)

class Event1(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    eventId = models.IntegerField(default=0)

class Event2(models.Model):
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    eventId = models.IntegerField(default=0)
    


class Countdown(models.Model):
    expiration_time = models.DateTimeField()

class Countdown2(models.Model):
    starting_time = models.DateTimeField()

class TextBehaviour(models.Model):
    name = models.CharField(max_length=50, default="normal")



class SubscriptionPrice(models.Model):
    newPrice = models.IntegerField(default=14999)
    oldPrice = models.IntegerField(default=22969)
    dropBy = models.IntegerField(default=17)
