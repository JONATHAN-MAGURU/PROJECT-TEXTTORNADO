from django.shortcuts import render, HttpResponse, redirect
import json
from django.http import HttpResponse, JsonResponse
from django.utils import timezone
from topApp.models import (
    Player,
    Comments,
    TypingDetails,
    TypingDetailsHistory,
    LeaderboardHistory,
    Tickets,
    TicketPurchase,
    Notification,
    Support,
    Subscription,
)
from django.core.exceptions import ObjectDoesNotExist
import random
from baseApp.models import (
    EndEvent,
    NextEvent,
    Countdown,
    TextBehaviour,
    TicketPrice,
    WinnerAndLooserMessage,
    ControlResults,
    Monetary,
    Quest,
)
from django.core.files.base import ContentFile
import base64
import os
from topApp.otp import *
from twilio.rest import Client
import http.client

from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
import logging

logger = logging.getLogger(__name__)

import time
from django.db import transaction
from codecs import encode
import baseApp


def resetPassword(request):
    return render(request, "resetPassword.html")


def terms(request):
    return render(request, "terms.html")

def policy(request):
    return render(request, "policy.html")


def ttd_user_login(request):
    return render(request, "ttd_user_login.html")

def aunth(request):
    return render(request, "aunth.html")


def ttd_user_signin(request):
    return render(request, "ttd_user_signin.html")


def amargerdon_e1(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        players = Player.objects.filter(username=username, password=password)
        if players.exists():
            player_details = players.values()
            textBehaviour = TextBehaviour.objects.first()
            baseApp.views.paragraph(textBehaviour.name)
            return render(request, "amargerdon_e1.html", {"player_d": player_details})
        else:
            return render(
                request,
                "ttd_user_login.html",
                {"message": "Incorect username or password."},
            )

    return redirect("ttd_user_login") 


def verifyPhoneNumber(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            number = data["number"]

            message_handler = MessageHandler(number)
            message_handler.send_otp_on_phone()

            return HttpResponse("success")
        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse("Invalid request method", status=400)


def resetPassword2(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            password = data["password"]
            number = data["number"]

            try:
                player = Player.objects.get(number=number)
                player.password = password
                player.save()
                return HttpResponse("saved")
            except Player.DoesNotExist:
                return HttpResponse("Player not found", status=404)
        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse("Invalid request method", status=400)


def verifyOtp(request):
    if request.method == "POST":
        try:
            account_sid = settings.account_sid
            auth_token = settings.auth_token
            messaging_service_sid = settings.messaging_service_sid
            data = json.loads(request.body)
            number = data["number"]
            otp = data["otp"]
            client = Client(account_sid, auth_token)

            verification_check = client.verify.v2.services(
                messaging_service_sid
            ).verification_checks.create(to=number, code=otp)
            if verification_check.status == "approved":
                return HttpResponse("approved")
            else:
                return HttpResponse("pending")

        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse("Invalid request method", status=400)


def verifyOtpReset(request):
    if request.method == "POST":
        try:
            account_sid = settings.account_sid
            auth_token = settings.auth_token
            messaging_service_sid = settings.messaging_service_sid
            data = json.loads(request.body)
            number = data["number"]
            otp = data["otp"]
            client = Client(account_sid, auth_token)

            verification_check = client.verify.v2.services(
                messaging_service_sid
            ).verification_checks.create(to=number, code=otp)
            if verification_check.status == "approved":
                return HttpResponse("approved")
            else:
                return HttpResponse("pending")

        except Exception as e:
            error_message = f"An error occurred: {str(e)}"
            return HttpResponse(error_message, status=500)
    else:
        return HttpResponse("Invalid request method", status=400)


def id_gen():
    nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    random.shuffle(nums)
    nums2 = "".join(nums)
    nums3 = nums2[:4]
    nums4 = int(nums3)
    return nums4


def id_gen2():
    nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    random.shuffle(nums)
    nums2 = "".join(nums)
    nums3 = nums2[:9]
    nums4 = int(nums3)
    return nums4


def checkUsername(request):
    try:
        if request.method == "POST":
            user_data = json.loads(request.body)
            username = user_data["username2"]
            try:
                if Player.objects.filter(username=username).exists():
                    return HttpResponse("not success")
                else:
                    return HttpResponse("go ahead")
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
        if request.method == "POST":
            user_data = json.loads(request.body)
            number = user_data["number"]
            try:
                if Player.objects.filter(number=number).exists():
                    return HttpResponse("not success")
                else:
                    return HttpResponse("go ahead")
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
        if request.method == "POST":
            user_data = json.loads(request.body)
            number = user_data["number"]
            try:
                account = Player.objects.filter(number=number)
                if account.exists():
                    account_details = account.values("username", "profile_pic")
                    return JsonResponse({"accountDetails": list(account_details)})
                else:
                    return HttpResponse("There is no account with such number")
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
        if request.method == "POST":
            user_data = json.loads(request.body)
            try:
                firstname = user_data["firstnameX"]
                lastname = user_data["lastnameX"]
                username = user_data["usernameX"]
                pasword = user_data["passwordX"]
                number = user_data["numberX"]
                width = user_data["main_width"]
                height = user_data["main_height"]
                deviceInfo = user_data["deviceInfo"]
                remaining_number = number[4:]
                generated_id = id_gen()
                ttd_id = int(f"{remaining_number}{generated_id}")
                try:
                    if Player.objects.filter(username=username, number=number).exists():
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
                            v_code=0,
                        )
                        player_data.save()

                        Tickets.objects.create(tickets_id=ttd_id)
                        Tickets.save()
                        saveNotf = Notification.objects.create(
                            tittle="TextTornado",
                            description=f"Hi {username}, Welcome to TextTornado, the ultimate destination for honing your typing skills while embracing competition, fun! and wining gadgets. ",
                            notf_id=ttd_id,
                        )
                        saveNotf = Notification.objects.create(
                            tittle="TextTornado Rewards",
                            description=f"You have received 1 free from TextTornado rewards ticket as a fuel for starting your typing journey.",
                            notf_id=ttd_id,
                        )

                        saveNotf.save()
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
    if request.method == "POST":
        try:
            player_d = json.loads(request.body)
            username = player_d["username"]
            firstname = player_d["firstname2"]
            lastname = player_d["lastname2"]
            email = player_d["mail"]
            player_id = player_d["id"]
            profile_pic_data = player_d["resizedImageBase64"]
            pic_id = id_gen()

            try:
                player_data2 = Player.objects.get(
                    username=username, player_id=player_id
                )

                player_data2.username = username
                player_data2.firstname = firstname
                player_data2.lastname = lastname
                player_data2.mail = email

                if profile_pic_data:
                    format, imgstr = profile_pic_data.split(";base64,")
                    ext = format.split("/")[-1]
                    profile_pic = ContentFile(
                        base64.b64decode(imgstr),
                        name=f"{username}{pic_id}_profile.{ext}",
                    )

                    if player_data2.profile_pic.name != "user_default_pic_x6puuUx.jpg":
                        old_pic_path = os.path.join(
                            settings.MEDIA_ROOT, player_data2.profile_pic.name
                        )
                        os.remove(old_pic_path)

                    player_data2.profile_pic.save(profile_pic.name, profile_pic)

                player_data2.save()
                return HttpResponse("You have successfully updated your account")
            except ObjectDoesNotExist:
                return HttpResponse("Player data not found")
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data")
        except Exception as e:
            return HttpResponse(f"An error occurred: {str(e)}", status=500)
    else:
        return HttpResponse("Something went wrong")


def sending_comments(request):
    if request.method == "POST":
        player_comments = json.loads(request.body)
        username = player_comments["username"]
        ttd_id = player_comments["id"]
        comment = player_comments["comment"]
        comment2 = Comments.objects.create(
            username2=username, player_id2=ttd_id, comment=comment
        )
        comment2.save()
        return HttpResponse("comment sent.")
    else:
        return HttpResponse("comment failed")


def sending_concern(request):
    if request.method == "POST":
        try:
            player_concerns = json.loads(request.body)
            username = player_concerns["username"]
            ttd_id = player_concerns["id"]
            concern = player_concerns["concern"]
            txtId = id_gen()

            try:
                checkUser = Player.objects.filter(username=username, player_id=ttd_id)
                if checkUser.exists():
                    comment2 = Support.objects.create(
                        source=username,
                        source_id=ttd_id,
                        source_text=concern,
                        text_id=txtId,
                    )
                    comment2.save()
                    return HttpResponse("concern sent.")
            except ObjectDoesNotExist:
                return HttpResponse("Player does not exist. Concern failed.")
        except json.JSONDecodeError as e:
            return HttpResponse("Error decoding JSON data: " + str(e))
    else:
        return HttpResponse("Invalid request method. Concern failed.")


def sending_concern_response(request):
    if request.method == "POST":
        try:
            player_concerns = json.loads(request.body)
            username = "TextTornado Assistant"
            ttd_id = player_concerns["userData"]
            concern = player_concerns["concern"]
            try:
                comment2 = Support.objects.create(
                    source=username,
                    source_id=ttd_id,
                    source_text=concern,
                )
                comment2.save()
                return HttpResponse("CONCERN REPLY SENT..")
            except ObjectDoesNotExist:
                return HttpResponse("Player does not exist. Concern failed.")
        except json.JSONDecodeError as e:
            return HttpResponse("Error decoding JSON data: " + str(e))
    else:
        return HttpResponse("Invalid request method. Concern failed.")


def get_concern2(request):
    if request.method == "POST":
        try:
            request_data = json.loads(request.body)
            userid = request_data.get("id")
            getConcern = Support.objects.filter(source_id=userid)
            if getConcern.exists():
                concerns = getConcern.all()
                return JsonResponse({"concerns": list(concerns.values())})
            else:
                return HttpResponse("No concerns found.")
        except Exception as e:
            logger.error(f"Error in get_concern view: {str(e)}")
            return HttpResponse("An error occurred while processing the request.")
    else:
        return HttpResponse("Bad request method. Use POST.")


def get_comments(request):
    comments = Comments.objects.all()
    return JsonResponse({"comments": list(comments.values())})


def get_notifications(request):
    if request.method == "POST":
        try:
            request_data = json.loads(request.body)
            notification_id = request_data.get("id")

            notification = Notification.objects.filter(notf_id=notification_id)
            if notification.exists():
                return JsonResponse({"notification": list(notification.values())})
            else:
                return HttpResponse("No notifications")
        except json.JSONDecodeError:
            return JsonResponse({"notification": "Invalid JSON data"}, status=400)
        except Notification.DoesNotExist:
            return JsonResponse({"notification": "No notifications"}, status=404)

    return JsonResponse({"notification": "Invalid request method"}, status=405)


def get_my_data(request):
    if request.method == "POST":
        seralize = json.loads(request.body)
        username = seralize["username"]
        ttd_id = seralize["id"]
        mydata = Player.objects.filter(username=username, player_id=ttd_id)
        if mydata.exists():
            mydata2 = mydata.values()
            return JsonResponse({"mydata": list(mydata2)})
    else:
        return HttpResponse("an error occured")


def setToOld(request):
    if request.method == "POST":
        seralize = json.loads(request.body)
        username = seralize["username"]
        ttd_id = seralize["id"]
        mydata = Player.objects.filter(username=username, player_id=ttd_id)
        if mydata.exists():
            mydata2 = mydata.first()
            mydata2.account = "old"
            mydata2.save()
            return HttpResponse("updated to old")
    else:
        return HttpResponse("an error occured")


def setToseen(request):
    if request.method == "POST":
        seralize = json.loads(request.body)
        ttd_id = seralize["id"]
        mydata = Player.objects.filter(player_id=ttd_id)
        if mydata.exists():
            mydata2 = mydata.first()
            mydata2.results = "seen"
            mydata2.save()
            return HttpResponse("updated to seen")
    else:
        return HttpResponse("an error occured")


def typing_details(request):
    try:
        if request.method == "POST":
            try:
                td = json.loads(request.body)
                wpm = td["wpm"]
                cpm = td["cpm"]
                mistakes = td["mistakes22"]
                username = td["username"]
                ttd_id = td["id"]
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
                    return HttpResponse("success")
                else:
                    player_d2 = TypingDetails.objects.create(
                        wpm=wpm1,
                        cpm=cpm1,
                        mistakes=mistakes1,
                        play_id=ttd_id,
                        username=username,
                        typo_id=typos_id,
                    )
                    player_d2.save()
                    return HttpResponse("success")
            except KeyError:
                return HttpResponse("Invalid data", status=400)
            except ValueError:
                return HttpResponse("Invalid data format", status=400)
    except Exception as e:
        return HttpResponse("An error occurred", status=500)


def get_test_details(request):
    try:
        getLims = ControlResults.objects.filter(limiter_name="LEADERBOARD")
        if getLims.exists():
            getLimit = getLims.first()
            results = TypingDetails.objects.all().order_by("-wpm")[: getLimit.limiter]
            results_data = list(results.values())

            images_data = {}
            player_ids = set(result["play_id"] for result in results_data)
            for player_id in player_ids:
                player = Player.objects.get(player_id=player_id)
                images_data[player_id] = (
                    player.profile_pic.url if player.profile_pic else None
                )

            final_results = []
            for result in results_data:
                player_id = result["play_id"]
                result["profile_pic"] = images_data.get(player_id)
                final_results.append(result)
            return JsonResponse({"results": final_results})
    except:
        print("Something went wrong with get_test_details function")


def leaderBoardHistory3(request):
    try:
        if request.method == "POST":
            res_dat = json.loads(request.body)
            userID = res_dat.get("id")

            getPlayer = Player.objects.filter(player_id=userID)
            if getPlayer.exists():
                results = LeaderboardHistory.objects.all().order_by("-wpm")
                results_data = list(results.values())

                images_data = {}
                player_ids = set(result["play_id"] for result in results_data)
                for player_id in player_ids:
                    player = Player.objects.get(player_id=player_id)
                    images_data[player_id] = (
                        player.profile_pic.url if player.profile_pic else None
                    )

                final_results = []
                for result in results_data:
                    player_id = result["play_id"]
                    result["profile_pic"] = images_data.get(player_id)
                    final_results.append(result)
                return JsonResponse({"results": final_results})
    except:
        print("Something went wrong with get_test_details function")


def leaderBoardHistory(request):
    try:
        if request.method == "POST":
            res_dat = json.loads(request.body)
            userID = res_dat.get("id")

            getPlayer = Player.objects.filter(player_id=userID)
            if getPlayer.exists():
                getLims = ControlResults.objects.filter(limiter_name="WINNERS")
                getLimiter = getLims.first()
                results = LeaderboardHistory.objects.all().order_by("-wpm")[
                    : getLimiter.limiter
                ]
                results_data = list(results.values())

                images_data = {}
                player_ids = set(result["play_id"] for result in results_data)
                for player_id in player_ids:
                    player = Player.objects.get(player_id=player_id)
                    images_data[player_id] = (
                        player.profile_pic.url if player.profile_pic else None
                    )

                final_results = []
                for result in results_data:
                    player_id = result["play_id"]
                    result["profile_pic"] = images_data.get(player_id)
                    final_results.append(result)
                return JsonResponse({"results": final_results})
            else:
                return HttpResponse("well well!!!")
    except:
        print("Something went wrong with get_test_details function")


def leaderBoardHistory2(request):
    try:
        if request.method == "POST":
            res_dat = json.loads(request.body)
            userID = res_dat.get("id")
            nonPartcipantMessage = ""
            getPlayer = Player.objects.filter(player_id=userID)
            if getPlayer.exists():
                results = LeaderboardHistory.objects.filter(play_id=userID)
                if results.exists():
                    user_res = results.first()
                    getLims = ControlResults.objects.filter(limiter_name="WINNERS")
                    getLimiter = getLims.first()
                    if user_res.rank <= getLimiter.limiter:
                        getMessages = WinnerAndLooserMessage.objects.filter(
                            messageId="winner"
                        )
                        messageTouser = getMessages.first()
                        return HttpResponse(f"{messageTouser.messagesx}")
                    else:
                        results_data = list(results.values())

                        images_data = {}
                        player_ids = set(result["play_id"] for result in results_data)
                        for player_id in player_ids:
                            player = Player.objects.get(player_id=player_id)
                            images_data[player_id] = (
                                player.profile_pic.url if player.profile_pic else None
                            )

                        final_results = []
                        for result in results_data:
                            player_id = result["play_id"]
                            result["profile_pic"] = images_data.get(player_id)
                            final_results.append(result)
                            print("hjhjsds dfdf")
                        return JsonResponse({"results": final_results})
                else:
                    getMessagess = WinnerAndLooserMessage.objects.filter(
                            messageId="nonp"
                        )
                    messageTouserr = getMessagess.first()
                    return HttpResponse(f"{messageTouserr.messagesx}")
    except:
        print("Something went wrong with get_test_details function")


def user_history():
    typing_details = TypingDetails.objects.all()
    for typing_detail in typing_details:
        if not TypingDetailsHistory.objects.filter(
            typo_id2=typing_detail.typo_id
        ).exists():
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
        history = TypingDetailsHistory.objects.all().order_by(
            "-date",
        )
        return JsonResponse({"history": list(history.values())})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def getEndEvents(request):
    try:
        user_id = request.GET.get("id")
        player = Player.objects.filter(player_id=user_id).first()
        countdown = Countdown.objects.first()

        remaining_time = None
        if countdown:
            current_time = timezone.now()
            remaining_time = (countdown.expiration_time - current_time).total_seconds()
        response_data = {
            "remaining_time": remaining_time,
            "seen_status": player.results if player else None,
        }

        return JsonResponse({"response_data": response_data})
    except Exception as e:
        error_message = str(e)
        return JsonResponse({"error": error_message}, status=500)


def getNextEvents(request):
    try:
        next_events = NextEvent.objects.all()
        return JsonResponse({"next_events": list(next_events.values())})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def get_ticket_data(request):
    user_id = request.GET.get("user_id")
    try:
        user_tickets = Tickets.objects.get(tickets_id=user_id)
        data = {
            "tickets_available": user_tickets.tickets_available,
            "tickets_used": user_tickets.tickets_used,
        }
        return JsonResponse(data)
    except Tickets.DoesNotExist:
        return JsonResponse({"error": "User not found"}, status=404)


def updateTickets(request):
    if request.method == "POST":
        data = json.loads(request.body)
        ticket_id = data["id"]

        try:
            ticketA = Tickets.objects.filter(tickets_id=ticket_id)
            ticket = ticketA.first()
            if ticket.tickets_available >= 1:
                ticket.tickets_available -= 1
                ticket.tickets_used += 1
                ticket.save()
                return HttpResponse("updated")
            else:
                return HttpResponse("No available tickets")
        except Tickets.DoesNotExist:
            return HttpResponse("Ticket not found")

    return HttpResponse("Invalid request method")


def processPayment(request):
    try:
        if request.method == "POST":
            paymentDetails = json.loads(request.body)
            amount = paymentDetails["amountX"]
            number = paymentDetails["numberX"]
            ticketss = paymentDetails["ticketX"]
            id = paymentDetails["id"]
            tickets = int(ticketss)

            conn = http.client.HTTPSConnection("api-gateway.ctechpay.com")
            dataList = []
            boundary = "wL36Yn8afVp8Ag7AmP8qZ0SA4n1v9T"
            dataList.append(encode("--" + boundary))
            dataList.append(encode("Content-Disposition: form-data; name=airtel;"))

            dataList.append(encode("Content-Type: {}".format("text/plain")))
            dataList.append(encode(""))

            dataList.append(encode("1"))
            dataList.append(encode("--" + boundary))
            dataList.append(encode("Content-Disposition: form-data; name=phone;"))

            dataList.append(encode("Content-Type: {}".format("text/plain")))
            dataList.append(encode(""))

            dataList.append(encode(str(number)))
            dataList.append(encode("--" + boundary))
            dataList.append(encode("Content-Disposition: form-data; name=amount;"))

            dataList.append(encode("Content-Type: {}".format("text/plain")))
            dataList.append(encode(""))

            dataList.append(encode(str(amount)))
            dataList.append(encode("--" + boundary))
            dataList.append(encode("Content-Disposition: form-data; name=token;"))

            dataList.append(encode("Content-Type: {}".format("text/plain")))
            dataList.append(encode(""))

            dataList.append(
                encode(
                    "UOavDtqLpVp1ZfYEujpjRpEKLplxoY8P24k143qlruchAtrwAvDOVcbj1QtZbCMf"
                )
            )
            dataList.append(encode("--" + boundary + "--"))
            dataList.append(encode(""))
            body = b"\r\n".join(dataList)
            payload = body
            headers = {
                "Content-type": "multipart/form-data; boundary={}".format(boundary)
            }
            conn.request("POST", "/airtel/access/", payload, headers)
            res = conn.getresponse()
            data = res.read()
            try:
                nested_json_str = data.decode("utf-8")
                response_json = json.loads(nested_json_str)

                if "data" in response_json and "transaction" in response_json["data"]:
                    transaction_id = response_json["data"]["transaction"]["id"]
                    time.sleep(15)
                    verify_result = verifyPayment(transaction_id, tickets, id, amount)
                    return HttpResponse(verify_result)
                else:
                    return HttpResponse("Can't process the request right now.")
            except json.JSONDecodeError:
                return HttpResponse("Error decoding JSON response.")
            except KeyError:
                return HttpResponse("Key not found in JSON response.")
            except Exception as e:
                time.sleep(15)
                return HttpResponse("Request Failed, Check your internet connnection.")

    except Exception as e:
        time.sleep(15)
        return HttpResponse(f"Request Failed, Check your internet conection. {e}")


def verifyPayment(trans_id, quantity, ticketId, amt):
    conn = http.client.HTTPSConnection("api-gateway.ctechpay.com")
    payload = ""
    headers = {
        "token": "UOavDtqLpVp1ZfYEujpjRpEKLplxoY8P24k143qlruchAtrwAvDOVcbj1QtZbCMf"
    }
    try:
        conn.request(
            "GET", f"/airtel/access/status/?trans_id={trans_id}", payload, headers
        )
        res = conn.getresponse()
        data = res.read()

        response_json = json.loads(data.decode("utf-8"))

        if "transaction_status" in response_json:
            transaction_status = response_json["transaction_status"]
            messagesg = response_json["message"]
            if transaction_status == "TS":
                ticketPurchase = TicketPurchase.objects.create(
                    tickets_id=int(ticketId),
                    tickets_purchased=quantity,
                    amount=int(amt),
                    message=messagesg,
                )

                with transaction.atomic():
                    getTicket = Tickets.objects.filter(tickets_id=ticketId)
                    ticket = getTicket.first()
                    ticket.tickets_available = ticket.tickets_available + quantity
                    ticket.save()
                    ticketPurchase.save()
                    saveNot = Notification.objects.create(
                        tittle="Airtel Money",
                        description=messagesg
                        + f". You have received {quantity} tickets",
                        notf_id=ticketId,
                    )
                    saveNot.save()
                    if quantity == 20:
                        getSubscriptionData = Subscription.objects.filter(
                            subscriptionId=ticketId
                        )
                        if getSubscriptionData.exists():
                            subData = getSubscriptionData.first()
                            subData.subscriptionCounter = 1
                            subData.subscriptionStatus = "active"
                            subData.subscriptionTimes += 1
                            subData.save()

                            save_notification = Notification.objects.create(
                                tittle="TextTornado Pass",
                                description="You have successfully subscribed TextTornado pass, enjoy the ultimate typing.",
                                notf_id=ticketId,
                            )
                            save_notification.save()
                        else:
                            createSubscription = Subscription.objects.create(
                                subscriptionId=ticketId,
                                subscriptionStatus="active",
                                subscriptionCounter=1,
                                subscriptionTimes=1,
                            )
                            createSubscription.save()
                            save_notification = Notification.objects.create(
                                tittle="TextTornado Pass",
                                description="You have successfully subscribed TextTornado pass, enjoy the ultimate typing.",
                                notf_id=ticketId,
                            )
                            save_notification.save()
                    else:
                        pass
                    return messagesg + f". You have received {quantity} tickets"
            elif transaction_status == "TF":
                ticketPurchase2 = TicketPurchase.objects.create(
                    tickets_id=int(ticketId),
                    tickets_purchased=quantity,
                    amount=int(amt),
                    message=messagesg,
                )
                ticketPurchase2.save()
                saveNot = Notification.objects.create(
                    tittle="Airtel Money", description=messagesg, notf_id=ticketId
                )
                saveNot.save()
                return messagesg
            else:
                return "Timeout payment failed. Kindly Try again."
        else:
            return "Transaction status not found in the response"
    except Exception as e:
        return f"An error occurred: {str(e)}"


def transferData():
    LeaderboardHistory.objects.all().delete()
    time.sleep(3)
    typing_details = TypingDetails.objects.values().order_by("-wpm")
    rank = 1
    for typing_detail in typing_details:
        wpm = typing_detail["wpm"]
        cpm = typing_detail["cpm"]
        mistakes = typing_detail["mistakes"]
        play_id = typing_detail["play_id"]
        username = typing_detail["username"]
        typo_id = typing_detail["typo_id"]
        date = typing_detail["date"]

        leaderboard_entry = LeaderboardHistory.objects.create(
            rank=rank,
            wpm=wpm,
            cpm=cpm,
            mistakes=mistakes,
            play_id=play_id,
            username=username,
            typo_id=typo_id,
            date=date,
        )
        rank += 1
        TypingDetails.objects.filter(id=typing_detail["id"]).delete()


def update_user_status(request):
    try:
        data = json.loads(request.body)
        user_id = data.get("userId")
        status = data.get("status")
        player = Player.objects.filter(player_id=user_id).first()
        if player:
            player.statuss = status
            player.save()
            response_data = {"message": f"User status updated to {status}"}
            return JsonResponse(response_data, status=200)
        else:
            return JsonResponse({"error": "Player not found"}, status=404)

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON data"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


def count_online_players(request):
    try:
        online_players_count = Player.objects.filter(statuss="online").count()
        response_text = str(online_players_count)
        return HttpResponse(response_text, content_type="text/plain", status=200)
    except Exception as e:
        return HttpResponse("0", content_type="text/plain", status=200)


def shareTickets(request):
    if request.method == "POST":
        try:
            shareDetails = json.loads(request.body)
            toX = shareDetails["to"]
            fromX = shareDetails["from"]
            amtOft = int(shareDetails["amtOft"])

            getFromDetails = Player.objects.filter(username=fromX)
            if getFromDetails.exists():
                getFromDetails2 = getFromDetails.first()
                getTicketsData = Tickets.objects.filter(
                    tickets_id=getFromDetails2.player_id
                ).first()
                if getTicketsData.tickets_available <= 1:
                    return HttpResponse("We didn't process your request...")
                elif getTicketsData.tickets_available < int(amtOft):
                    return HttpResponse(
                        "The specified tickets are greater than residual tickets..."
                    )
                else:
                    getFromDetails3 = Player.objects.filter(number=toX)
                    if getFromDetails3.exists():
                        getFromDetails4 = getFromDetails3.first()
                        getTicketsData2 = Tickets.objects.filter(
                            tickets_id=getFromDetails4.player_id
                        ).first()
                        getTicketsData2.tickets_available = (
                            getTicketsData2.tickets_available + amtOft
                        )
                        getTicketsData2.save()

                        getTicketsDataX = Tickets.objects.filter(
                            tickets_id=getFromDetails2.player_id
                        ).first()
                        getTicketsDataX.tickets_available -= amtOft
                        getTicketsDataX.save()
                        notfTitle1 = "Shared tickets"
                        notfTitle2 = "Received tickets"
                        notfDes1 = f"Successfully shared {amtOft} tickets with {getFromDetails4.username}. You now have {getTicketsDataX.tickets_available} tickets left."
                        notfDes2 = f"You have received {amtOft} tickets from {fromX}. Now you have {getTicketsData2.tickets_available} tickets"
                        saveNotification = Notification.objects.create(
                            tittle=notfTitle1,
                            description=notfDes1,
                            notf_id=getFromDetails2.player_id,
                        )

                        saveNotification = Notification.objects.create(
                            tittle=notfTitle2,
                            description=notfDes2,
                            notf_id=getFromDetails4.player_id,
                        )
                        saveNotification.save()
                        return HttpResponse(notfDes1)
                    else:
                        return HttpResponse("We didn't process your request..")
            else:
                return HttpResponse("We didn't process your request..")
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error decoding JSON: {str(e)}")
        except KeyError as e:
            return HttpResponse(f"KeyError: {str(e)}")
        except Exception as e:
            return HttpResponse(f"An error occurred: {str(e)}")
    else:
        return HttpResponse("We didn't process your request..")


def claimTickets(request):
    if request.method == "POST":
        try:
            claimDetails = json.loads(request.body)
            user_id = claimDetails["id"]
            getTicketsData = Tickets.objects.filter(tickets_id=user_id)
            if getTicketsData.exists():
                ticketsData = getTicketsData.first()
                if ticketsData.claim_tickets > 0:
                    ticketsData.tickets_available += ticketsData.claim_tickets
                    ticketsData.claim_tickets = 0
                    ticketsData.save()
                    return HttpResponse("Successfully claimed")
                else:
                    return HttpResponse("No free tickets available")
            else:
                return HttpResponse("User not found")
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error parsing JSON: {e}")
        except Exception as e:
            return HttpResponse(f"An error occurred: {e}")
    else:
        return HttpResponse("Invalid request method")


def claimTickets2(request):
    if request.method == "POST":
        try:
            claimDetails = json.loads(request.body)
            user_id = claimDetails["id"]
            getTicketsData = Tickets.objects.filter(tickets_id=user_id)
            if getTicketsData.exists():
                ticketsData = getTicketsData.first()
                if ticketsData.claim_tickets > 0:
                    return HttpResponse(
                        "You have received free tickets, claim your tickets"
                    )
                else:
                    return HttpResponse("No free tickets available")
            else:
                return HttpResponse("User not found")
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error parsing JSON: {e}")
        except Exception as e:
            return HttpResponse(f"An error occurred: {e}")
    else:
        return HttpResponse("Invalid request method")


def clearNotification(request):
    if request.method == "POST":
        getDat = json.loads(request.body)
        notId = getDat["id"]

        checkNot = Notification.objects.filter(notf_id=notId)
        if checkNot.exists():
            checkNot.delete()
            return HttpResponse("notifications deleted succesifully..")
        else:
            return HttpResponse("You dont have notifications..")


def getTicketsPrices2(request):
    try:
        ticketPrice = TicketPrice.objects.all()
        return JsonResponse({"ticketPrice": list(ticketPrice.values())})
    except Exception as e:
        return HttpResponse("An error occurred while processing the request.")


def getPrizes(request):
    if request.method == "POST":
        try:
            request_data = json.loads(request.body)
            userid = request_data.get("id")
            getPlayer = Player.objects.filter(player_id=userid)
            if getPlayer.exists():
                monetary= Monetary.objects.all()
                return JsonResponse({"monetary": list(monetary.values())})
            else:
                return HttpResponse("Bad request.")
        except Exception as e:
            return HttpResponse(f"An error occurred while processing the request. {e}")
    else:
        return HttpResponse("Bad request method. Use POST.")
    


def getQuest(request):
    if request.method == "POST":
        try:
            request_data = json.loads(request.body)
            userid = request_data.get("id")
            getPlayer = Player.objects.filter(player_id=userid)
            if getPlayer.exists():
                quest= Quest.objects.all()
                return JsonResponse({"quest": list(quest.values())})
            else:
                return HttpResponse("Bad request.")
        except Exception as e:
            return HttpResponse(f"An error occurred while processing the request. {e}")
    else:
        return HttpResponse("Bad request method. Use POST.")