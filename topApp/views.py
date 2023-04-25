from django.shortcuts import render, HttpResponse , redirect
import json
from topApp.models import Player
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


    







