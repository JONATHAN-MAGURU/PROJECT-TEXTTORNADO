from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.db import models
from django.utils import timezone


class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, password, **extra_fields)


class Player(AbstractBaseUser, PermissionsMixin):
    firstname = models.CharField(max_length=100, default="")
    lastname = models.CharField(max_length=100, default="")
    mail = models.CharField(max_length=255, default="")
    statuss = models.CharField(max_length=25, default="")
    username = models.CharField(max_length=100, unique=True)
    password = models.CharField(max_length=100)
    number = models.CharField(max_length=100)
    width = models.IntegerField()
    height = models.IntegerField()
    player_id = models.IntegerField()
    v_code = models.IntegerField()
    os = models.CharField(max_length=100)
    account = models.CharField(max_length=20, default="new")
    results = models.CharField(max_length=20, default="seen")
    profile_pic = models.ImageField(
        default="user_default_pic_x6puuUx.jpg", null=True, blank=True
    )
    date = models.DateTimeField(default=timezone.now, blank=True)

    # Add your custom fields as needed

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    objects = CustomUserManager()

    USERNAME_FIELD = "username"

    # Add related_name for the groups and user_permissions fields
    groups = models.ManyToManyField(
        "auth.Group",
        related_name="player_set",
        blank=True,
        verbose_name="groups",
        help_text="The groups this user belongs to.",
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="player_set",
        blank=True,
        verbose_name="user permissions",
        help_text="Specific permissions for this user.",
    )


class Comments(models.Model):
    player_id2 = models.CharField(max_length=10)
    username2 = models.CharField(max_length=100)
    comment = models.CharField(max_length=1000)
    comment_date = models.DateTimeField(default=timezone.now, blank=True)


class TypingDetails(models.Model):
    wpm = models.IntegerField()
    cpm = models.IntegerField()
    mistakes = models.IntegerField()
    play_id = models.CharField(max_length=10)
    username = models.CharField(max_length=255)
    typo_id = models.IntegerField(default=0)
    date = models.DateTimeField(default=timezone.now, blank=True)


class LeaderboardHistory(models.Model):
    rank = models.IntegerField()
    wpm = models.IntegerField()
    cpm = models.IntegerField()
    mistakes = models.IntegerField()
    play_id = models.CharField(max_length=10)
    username = models.CharField(max_length=255)
    typo_id = models.IntegerField(default=0)
    date = models.DateTimeField(default=timezone.now, blank=True)


class TypingDetailsHistory(models.Model):
    wpm = models.IntegerField()
    cpm = models.IntegerField()
    mistakes = models.IntegerField()
    play_id = models.CharField(max_length=10)
    username = models.CharField(max_length=255)
    typo_id2 = models.IntegerField(default=0)
    date = models.DateTimeField(default=timezone.now, blank=True)


class Tickets(models.Model):
    tickets_available = models.IntegerField(default=1)
    tickets_id = models.IntegerField(default=0)
    tickets_used = models.IntegerField(default=0)
    claim_tickets = models.IntegerField(default=0)


class TicketPurchase(models.Model):
    tickets_id = models.IntegerField(default=0)
    tickets_purchased = models.IntegerField(default=0)
    amount = models.IntegerField(default=0)
    purchase_date = models.DateTimeField(default=timezone.now, blank=True)
    message = models.CharField(max_length=255, default="")


class Notification(models.Model):
    tittle = models.CharField(max_length=200)
    description = models.CharField(max_length=5000)
    notf_id = models.IntegerField(default=0)
    notification_date = models.DateTimeField(default=timezone.now, blank=True)


class Support(models.Model):
    source = models.CharField(max_length=200)
    source_text = models.CharField(max_length=5000)
    reply = models.CharField(max_length=50, default="no")
    source_id = models.IntegerField(default=0)
    text_id = models.IntegerField(default=0)
    source_date = models.DateTimeField(default=timezone.now, blank=True)


class Subscription(models.Model):
    subscriptionStatus = models.CharField(max_length=255, default="expired")
    subscriptionId = models.IntegerField(default=2)
    subscriptionTimes = models.IntegerField(default=0)
    subscriptionCounter = models.IntegerField(default=0)
    subscriptionDate = models.DateTimeField(default=timezone.now, blank=True)


class Typing_parttern(models.Model):
    partern_id = models.IntegerField()
    ascending_parttern = models.CharField(max_length=99999, default="")
    deascending_parttern = models.CharField(max_length=99999, default="")
    pt_name = models.CharField(max_length=99, default="")
    keyStroke_parttern = models.CharField(max_length=99999, default="")
    finished_parttern = models.CharField(max_length=99999, default="")
    given_words = models.CharField(max_length=99999, default="")
    wpm = models.IntegerField(default=0)
    cpm = models.IntegerField(default=0)
    mistakes = models.IntegerField(default=0)
    verification_token = models.CharField(max_length=99, default="")
    Date_partten = models.DateTimeField(default=timezone.now, blank=True)

class Typing_partterns_History(models.Model):
    partern_id = models.IntegerField()
    ascending_parttern = models.CharField(max_length=99999, default="")
    deascending_parttern = models.CharField(max_length=99999, default="")
    pt_name = models.CharField(max_length=99, default="")
    keyStroke_parttern = models.CharField(max_length=99999, default="")
    finished_parttern = models.CharField(max_length=99999, default="")
    given_words = models.CharField(max_length=99999, default="")
    wpm = models.IntegerField(default=0)
    cpm = models.IntegerField(default=0)
    mistakes = models.IntegerField(default=0)
    verification_token = models.CharField(max_length=99, default="")
    Date_partten = models.DateTimeField(default=timezone.now, blank=True)
