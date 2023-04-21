from django.shortcuts import render, HttpResponse
import json
from topApp.models import Player
import random
# Create your views here.
def ttd_user_login(request):
    return render(request, 'ttd_user_login.html')


def ttd_user_signin(request):
    return render(request, 'ttd_user_signin.html')

def ttd_user_homepage(request):
    return render(request, 'ttd_user_homepage.html')

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
        ttd_id = user_data2['x']
        code = user_data2['code2']

    return HttpResponse(f"yes {ttd_id}  {code} ")




