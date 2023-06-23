from django.shortcuts import render, HttpResponse , redirect
import json
from django.http import HttpResponse, JsonResponse
from topApp.models import Player, Comments, TypingDetails,TypingDetailsHistory
import random
# Create your views here.
def ttd_user_login(request):
    return render(request, 'ttd_user_login.html')


def ttd_user_signin(request):
    return render(request, 'ttd_user_signin.html')

def ttd_user_homepage(request):
      if request.method == 'POST':
        username_u = request.POST['username_u2']
        password_u = request.POST['password2']
        players = Player.objects.filter(username = username_u , password = password_u) 
        if players.exists():
            player_details =  players.values()
            return render(request, 'ttd_user_homepage.html',{'player_d':player_details})
        else:
            return HttpResponse('Failed to connect')
      return redirect('ttd_user_homepage')
        

def id_gen():
    nums = ['1' , '2', '3','4','5', '6', '7', '8', '9']
    random.shuffle(nums)
    nums2 = "".join(nums)
    nums3 =  nums2[:7]
    nums4 =  int(nums3)
    return nums4

def id_gen2():
    nums = ['1' , '2', '3','4','5', '6', '7', '8', '9']
    random.shuffle(nums)
    nums2 = "".join(nums)
    nums3 =  nums2[:5]
    nums4 =  int(nums3)
    return nums4


def v_player(request):
    if request.method == 'POST':
        user_data = json.loads(request.body)
        username = user_data['username']
        pasword = user_data['password']
        number = user_data['number']
        width = user_data['main_width']
        height = user_data['main_height']
        os = user_data['os']
        ttd_id = id_gen()
        if Player.objects.filter(username = username).exists():
            return HttpResponse("not success")
        else:
             player_data = Player.objects.create(
                    username= username,
                    password = pasword,
                    number = number,
                    width= width,
                    height =height,
                    os = os,
                    player_id = ttd_id,
                    v_code = 0
                    )
             player_data.save()
             return HttpResponse(ttd_id)
        
        

def v_player2(request): 
    if request.method == 'POST':
        user_data2 = json.loads(request.body)
        ttd_id2 = user_data2['x']
        code = user_data2['code2']
        player = Player.objects.get(player_id = ttd_id2)
        player.v_code = code
        player.save()
        return HttpResponse("success")

def second_player_data(request):
    if request.method == 'POST':
        player_d = json.loads(request.body)
        username = player_d['username']
        username2 = player_d['usern2']
        firstname = player_d['firstname2']
        lastname = player_d['lastname2']
        email = player_d['mail']
        player_id = player_d['id']
        player_data = Player.objects.filter(username = username , player_id = player_id)
        if player_data.exists():
            player_data2 = Player.objects.get(username = username, player_id = player_id)
            player_data2.username = username2
            player_data2.firstname =firstname
            player_data2.lastname= lastname
            player_data2.mail = email
            player_data2.save()
            return HttpResponse('You have successsifully updated your account')
        else:
            return HttpResponse('we cant update your account right now')
    else:
        return HttpResponse('something went wrong')


def sending_comments(request):
    if request.method == 'POST':
        player_comments = json.loads(request.body)
        username = player_comments['username']
        ttd_id = player_comments['id']
        comment = player_comments['comment']
        comment2 = Comments.objects.create(username2 = username, player_id2 = ttd_id, comment = comment )
        comment2.save()
        return HttpResponse('success')


def get_comments(request):
    comments = Comments.objects.all()
    return JsonResponse({"comments":list(comments.values())})


def get_my_data(request):
    if request.method == 'POST':
        seralize = json.loads(request.body)
        username = seralize['username']
        ttd_id = seralize['id']
        mydata = Player.objects.filter(username = username, player_id = ttd_id)
        if mydata.exists():
           mydata2 = mydata.values()
           return JsonResponse({'mydata':list(mydata2)})
    else:
        return HttpResponse('an error occured')


def typing_details(request):
    if request.method == 'POST':
        td = json.loads(request.body)
        wpm = td['wpm']
        cpm = td['cpm']
        mistakes = td['mistakes22']
        username = td['username']
        ttd_id = td['id']
        ttd_id2 = int(ttd_id)
        wpm1 = int(wpm)
        cpm1 = int(cpm)
        mistakes1 = int(mistakes)
        typos_id = id_gen2()
        if TypingDetails.objects.filter(play_id=ttd_id2).exists():
            user_history()
            player_d = TypingDetails.objects.get(play_id=ttd_id2)
            player_d.wpm = wpm1
            player_d.cpm = cpm1
            player_d.mistakes = mistakes1
            player_d.typo_id = typos_id
            player_d.save()
            return HttpResponse('success')
        else:
            player_d2 = TypingDetails.objects.create(wpm = wpm1, cpm = cpm1, mistakes = mistakes1, play_id = ttd_id, username =username, typo_id =typos_id)
            player_d2.save()
            return HttpResponse('success')

def get_test_details(request):
     results = TypingDetails.objects.all().order_by('-wpm',)
     return JsonResponse({"results":list(results.values())})
 
def user_history():
     typing_details = TypingDetails.objects.all()
     for typing_detail in typing_details:
         if TypingDetailsHistory.objects.filter(typo_id2 = typing_detail.typo_id).exists():
              print("DATA ALREADY EXISTS")
         else:
            history = TypingDetailsHistory.objects.create(
                wpm=typing_detail.wpm,
                cpm=typing_detail.cpm,
                mistakes=typing_detail.mistakes,
                play_id=typing_detail.play_id,
                username=typing_detail.username,
                typo_id2 =typing_detail.typo_id,
            )
     history.save()

def get_history(request):
    history = TypingDetailsHistory.objects.all().order_by('-date',)
    return JsonResponse({"history":list(history.values())})
    