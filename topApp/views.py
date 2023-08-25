from django.shortcuts import render, HttpResponse, redirect
import json
from django.http import HttpResponse, JsonResponse
from topApp.models import Player, Comments, TypingDetails, TypingDetailsHistory
from django.core.exceptions import ObjectDoesNotExist
import random
from baseApp.models import EndEvent, NextEvent
from django.core.files.base import ContentFile
import base64
import os
from topApp.otp import *
from twilio.rest import Client

def resetPassword(request):
    return render(request, 'resetPassword.html')

def ttd_user_login(request):
    return render(request, 'ttd_user_login.html')


def ttd_user_signin(request):
    return render(request, 'ttd_user_signin.html')

def session(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        players = Player.objects.filter(username=username, password=password)
        if players.exists():
            player_details = players.values()
            return render(request, 'session.html', {'player_d': player_details})
        else:
            return render(request, 'ttd_user_login.html', {'message': 'Incorect username or password.'})

    return render(request, 'ttd_user_login.html')


def verifyPhoneNumber(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            number = data['number']

            message_handler = MessageHandler(number)
            message_handler.send_otp_on_phone()

            return HttpResponse('success')
        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse('Invalid request method', status=400)
    
def resetPassword2(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            password = data['password']
            number = data['number']
      
            try:
                player = Player.objects.get(number=number)
                player.password = password
                player.save()
                return HttpResponse('saved')
            except Player.DoesNotExist:
                return HttpResponse('Player not found', status=404)
        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse('Invalid request method', status=400)



def verifyOtp(request):
    if request.method == 'POST':
        try:
            account_sid = settings.account_sid
            auth_token = settings.auth_token
            messaging_service_sid = settings.messaging_service_sid
            data = json.loads(request.body)
            number = data['number']
            otp = data['otp']
            client = Client(account_sid, auth_token)

            verification_check = client.verify \
                                    .v2 \
                                    .services(messaging_service_sid) \
                                    .verification_checks \
                                    .create(to=number, code=otp)         
            if verification_check.status == 'approved':
                  return HttpResponse('approved')
            else:
                return HttpResponse('pending')

        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse('Invalid request method', status=400)
    
def verifyOtpReset(request):
    if request.method == 'POST':
        try:
            account_sid = settings.account_sid
            auth_token = settings.auth_token
            messaging_service_sid = settings.messaging_service_sid
            data = json.loads(request.body)
            number = data['number']
            otp = data['otp']
            client = Client(account_sid, auth_token)

            verification_check = client.verify \
                                    .v2 \
                                    .services(messaging_service_sid) \
                                    .verification_checks \
                                    .create(to=number, code=otp)         
            if verification_check.status == 'approved':
                  return HttpResponse('approved')
            else:
                return HttpResponse('pending')

        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse('Invalid request method', status=400)



def id_gen():
    nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9','0']
    random.shuffle(nums)
    nums2 = "".join(nums)
    nums3 = nums2[:9]
    nums4 = int(nums3)
    return nums4


def id_gen2():
    nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    random.shuffle(nums) 
    nums2 = "".join(nums)
    nums3 = nums2[:9]
    nums4 = int(nums3)
    return nums4


def checkUsername(request):
    try:
        if request.method == 'POST':
            user_data = json.loads(request.body)
            username = user_data['username2']
            try:
                if Player.objects.filter(username=username).exists():
                    return HttpResponse("not success")
                else:
                    return HttpResponse('go ahead')
            except ObjectDoesNotExist:
                return HttpResponse("User does not exist")
    except json.JSONDecodeError:
        return HttpResponse("Invalid JSON data")
    except KeyError:
        return HttpResponse("Invalid JSON key")
    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}")
    
def checkNumber(request):
    try:
        if request.method == 'POST':
            user_data = json.loads(request.body)
            number = user_data['number']
            try:
                if Player.objects.filter(number=number).exists():
                    return HttpResponse("not success")
                else:
                    return HttpResponse('go ahead')
            except ObjectDoesNotExist:
                return HttpResponse("User does not exist")
    except json.JSONDecodeError:
        return HttpResponse("Invalid JSON data")
    except KeyError:
        return HttpResponse("Invalid JSON key")
    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}")


def searchAccount(request):
    try:
        if request.method == 'POST':
            user_data = json.loads(request.body)
            number = user_data['number']
            try:
                account = Player.objects.filter(number=number)
                if account.exists():
                    account_details = account.values('username', 'profile_pic')
                    return JsonResponse({"accountDetails": list(account_details)})
                else:
                    return HttpResponse('There is no account with such number')
            except ObjectDoesNotExist:
                return HttpResponse("User does not exist")
    except json.JSONDecodeError:
        return HttpResponse("Invalid JSON data")
    except KeyError:
        return HttpResponse("Invalid JSON key")
    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}")



def v_player(request):
    try:
        if request.method == 'POST':
            user_data = json.loads(request.body)
            try:
                firstname = user_data['usernameX']
                lastname = user_data['lastnameX']
                username = user_data['usernameX']
                pasword = user_data['passwordX']
                number = user_data['numberX']
                width = user_data['main_width']
                height = user_data['main_height']
                deviceInfo = user_data['deviceInfo']
                ttd_id = id_gen()
                
                try:
                    if Player.objects.filter(username=username).exists():
                        return HttpResponse("not success")
                    else:
                        player_data = Player.objects.create(
                            firstname=firstname,
                            lastname=lastname,
                            username=username,
                            password=pasword,
                            number=number,
                            width=width,
                            height=height,
                            os=deviceInfo,
                            player_id=ttd_id,
                            v_code=0
                        )
                        player_data.save()
                        return HttpResponse("saved")
                except ObjectDoesNotExist:
                    return HttpResponse("Error: Player does not exist")
            except KeyError:
                return HttpResponse("Invalid JSON keys")
    except json.JSONDecodeError:
        return HttpResponse("Invalid JSON data")
    except Exception as e:
        return HttpResponse(f"An error occurred: {str(e)}")



def second_player_data(request):
    if request.method == 'POST':
        try:
            player_d = json.loads(request.body)
            username = player_d['username']
            username2 = player_d['usern2']
            firstname = player_d['firstname2']
            lastname = player_d['lastname2']
            email = player_d['mail']
            player_id = player_d['id']
            profile_pic_data = player_d['resizedImageBase64']
            pic_id = id_gen()

            try:
                player_data2 = Player.objects.get(
                    username=username, player_id=player_id)

                player_data2.username = username2
                player_data2.firstname = firstname
                player_data2.lastname = lastname
                player_data2.mail = email

                if profile_pic_data:
                    format, imgstr = profile_pic_data.split(';base64,')
                    ext = format.split('/')[-1]
                    profile_pic = ContentFile(base64.b64decode(imgstr), name=f'{username}{pic_id}_profile.{ext}')

                    if player_data2.profile_pic.name != 'user_default_pic_x6puuUx.jpg':
                        old_pic_path = os.path.join(settings.MEDIA_ROOT, player_data2.profile_pic.name)
                        os.remove(old_pic_path)

                    player_data2.profile_pic.save(profile_pic.name, profile_pic)

                player_data2.save()
                return HttpResponse('You have successfully updated your account')
            except ObjectDoesNotExist:
                return HttpResponse('Player data not found')
        except json.JSONDecodeError:
            return HttpResponse('Invalid JSON data')
        except Exception as e:
            return HttpResponse(f'An error occurred: {str(e)}', status=500)
    else:
        return HttpResponse('Something went wrong')



def sending_comments(request):
    if request.method == 'POST':
        player_comments = json.loads(request.body)
        username = player_comments['username']
        ttd_id = player_comments['id']
        comment = player_comments['comment']
        comment2 = Comments.objects.create(
            username2=username, player_id2=ttd_id, comment=comment)
        comment2.save()
        return HttpResponse('success')


def get_comments(request):
    comments = Comments.objects.all()
    return JsonResponse({"comments": list(comments.values())})


def get_my_data(request):
    if request.method == 'POST':
        seralize = json.loads(request.body)
        username = seralize['username']
        ttd_id = seralize['id']
        mydata = Player.objects.filter(username=username, player_id=ttd_id)
        if mydata.exists():
            mydata2 = mydata.values()
            return JsonResponse({'mydata': list(mydata2)})
    else:
        return HttpResponse('an error occured')

def typing_details(request):
    try:
        if request.method == 'POST':
            try:
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
                    player_d2 = TypingDetails.objects.create(
                        wpm=wpm1, cpm=cpm1, mistakes=mistakes1, play_id=ttd_id, username=username, typo_id=typos_id)
                    player_d2.save()
                    return HttpResponse('success')
            except KeyError:
                return HttpResponse('Invalid data', status=400)
            except ValueError:
                return HttpResponse('Invalid data format', status=400)
    except Exception as e:
        return HttpResponse('An error occurred', status=500)



def get_test_details(request):
    try:
        results = TypingDetails.objects.all().order_by('-wpm')
        results_data = list(results.values())

        images_data = {}
        player_ids = set(result['play_id'] for result in results_data)
        for player_id in player_ids:
            player = Player.objects.get(player_id=player_id)
            images_data[player_id] = player.profile_pic.url if player.profile_pic else None

        final_results = []
        for result in results_data:
            player_id = result['play_id']
            result['profile_pic'] = images_data.get(player_id)
            final_results.append(result)
        return JsonResponse({"results": final_results})
    except:
        print("Something went wrong with get_test_details function")



def user_history():
    typing_details = TypingDetails.objects.all()
    for typing_detail in typing_details:
        if not TypingDetailsHistory.objects.filter(typo_id2=typing_detail.typo_id).exists():
            history = TypingDetailsHistory.objects.create(
                wpm=typing_detail.wpm,
                cpm=typing_detail.cpm,
                mistakes=typing_detail.mistakes,
                play_id=typing_detail.play_id,
                username=typing_detail.username,
                typo_id2=typing_detail.typo_id,
            )
            history.save()


def get_history(request):
    try:
        history = TypingDetailsHistory.objects.all().order_by('-date',)
        return JsonResponse({"history": list(history.values())})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def getEndEvents(request):
    try:
        end_events = EndEvent.objects.all()
        return JsonResponse({"end_events": list(end_events.values())})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

def getNextEvents(request):
    try:
        next_events = NextEvent.objects.all()
        return JsonResponse({"next_events": list(next_events.values())})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)