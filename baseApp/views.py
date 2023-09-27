from django.shortcuts import render, HttpResponse, redirect
from django.http import HttpResponse, JsonResponse
from datetime import datetime, timezone
from datetime import timedelta

from datetime import date
import json
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
)
from topApp.models import Player, Tickets, TypingDetails, Notification, Support
from topApp.views import id_gen, transferData
import random
import time


def ttd_admin_login(request):
    return render(request, "ttd_admin_login.html")


def ttd_admin_signin(request):
    return render(request, "ttd_admin_signin.html")


def ttd_admin_homepage(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        details = Admins_details.objects.filter(emails=username, passw=password)
        if details.exists():
            date1 = datetime.now()
            admin_details = details.values()
            admin_details2 = Admins_details.objects.all().values()
            amount_of_admins = len(admin_details2)
            return render(
                request,
                "ttd_admin_homepage.html",
                {
                    "admin_details": admin_details,
                    "admin_details2": admin_details2,
                    "date1": date1,
                    "amount_of_admins": amount_of_admins,
                },
            )
        else:
            return HttpResponse("Failed to connect")
    return redirect("ttd_admin_login")


def paragraph():
    paragraphs = Typing_testing.objects.all()
    for paragraph in paragraphs:
        splitedParagraph = paragraph.test.split()
        random.shuffle(splitedParagraph)
        joinedParagraph = " ".join(splitedParagraph)

        vps = Variant_paragraphs.objects.filter(variant_id=paragraph.test_id)
        if vps.exists():
            for vp in vps:
                vp.variant_p = joinedParagraph
                vp.save()
        else:
            vp = Variant_paragraphs.objects.create(
                variant_p=joinedParagraph, variant_id=paragraph.test_id
            )


def get_paragraph(request):
    paragraphs = Variant_paragraphs.objects.all()
    return JsonResponse({"paragraphs": list(paragraphs.values())})


def get_typing_tests(request):
    typing_testing = Typing_testing.objects.all()
    return JsonResponse({"Typing_testings": list(typing_testing.values())})


def get_typing_variants(request):
    variant_paragraphs = Variant_paragraphs.objects.all()
    return JsonResponse({"variant_paragraphs": list(variant_paragraphs.values())})


def typing_tests(request):
    if request.method == "POST":
        tests = json.loads(request.body)
        textarea = tests["textarea2"]
        id = id_gen()
        count = textarea.split()
        get_all_paragraphs = Typing_testing.objects.all().values()
        amount_of_paragraphs = len(get_all_paragraphs)
        if len(count) > 40:
            if len(count) <= 180:
                if amount_of_paragraphs < 10:
                    paragraphs = Typing_testing.objects.create(
                        test=textarea, test_id=id
                    )
                    paragraphs.save()
                    return HttpResponse("SAVED SUSSESSIFULLY....")
                else:
                    return HttpResponse("YOU HAVE REACHED MAXMUM AMOUT OF PARAGRAPHS..")
            else:
                return HttpResponse("TEST PARAGRAPH SHOULD NOT EXCEED 180 WORDS.")
        else:
            return HttpResponse("TEST PARAGRAPH SHOULD BE GREATER THAN 40 WORDS.")
    else:
        return HttpResponse("SOMETHING WENT WRONG..")


def delete_paragraphs(request):
    if request.method == "POST":
        data = json.loads(request.body)
        checked_array = data.get("checkedArray", [])
        for paragraph_id in checked_array:
            Typing_testing.objects.filter(test_id=paragraph_id).delete()
            Variant_paragraphs.objects.filter(variant_id=paragraph_id).delete()
        return HttpResponse("DELETED SUCCESSIFULLY")


def delete_variants(request):
    if request.method == "POST":
        data = json.loads(request.body)
        checked_array = data.get("checkedArray", [])
        for paragraph_id in checked_array:
            Variant_paragraphs.objects.filter(variant_id=paragraph_id).delete()
        return HttpResponse("VARIANTS DELETED SUCCESSIFULLY")


def editing_tests(request):
    if request.method == "POST":
        textToedit = json.loads(request.body)
        toEditId = textToedit["toEditId"]
        toEditText = textToedit["toEditText"]
        paraDetails = Typing_testing.objects.filter(test_id=toEditId)
        if paraDetails.exists():
            getParagraphToEdit = Typing_testing.objects.get(test_id=toEditId)
            getParagraphToEdit.test = toEditText
            getParagraphToEdit.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        else:
            return HttpResponse("UPDATE FAILED...")
    else:
        return "something went wrong"


def getUsers(request):
    user = Player.objects.all()
    return JsonResponse({"user": list(user.values())})


def getFontendCodes(request):
    codes = Frontend.objects.all()
    return JsonResponse({"codes": list(codes.values())})


def getLeaderBoardCode(request):
    codes = Leaderboard.objects.all()
    return JsonResponse({"codes": list(codes.values())})


def getTypingAreaCode(request):
    codes = TypingArea.objects.all()
    return JsonResponse({"codes": list(codes.values())})


def getEvent1Code(request):
    codes = Event1.objects.all()
    return JsonResponse({"codes": list(codes.values())})


def getEvent2Code(request):
    codes = Event2.objects.all()
    return JsonResponse({"codes": list(codes.values())})


def getStartTimerOneCodes(request):
    codes = EndEvent.objects.all()
    return JsonResponse({"codes": list(codes.values())})


def getSearch(request):
    if request.method == "POST":
        player = json.loads(request.body)
        username = player["toSearch"]
        getPlayer = Player.objects.filter(username=username)

        if getPlayer.exists():
            results = getPlayer.values()
            return JsonResponse({"searchResults": list(results)})
        else:
            return JsonResponse({"error": list("error")})


def setEventEnd(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            ms = data.get("ms")

            if ms is not None:
                try:
                    event = EndEvent.objects.get(endEventId=85747)
                    event.endEvent = ms
                    event.save()
                    return HttpResponse("Event end updated successfully.", status=200)
                except EndEvent.DoesNotExist:
                    return HttpResponse("Failled : Switch timmer 1 off.", status=404)
            else:
                return HttpResponse("Invalid data format.", status=400)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data.", status=400)
        except Exception as e:
            return HttpResponse(f"An error occurred: {str(e)}", status=500)
    else:
        return HttpResponse("Method not allowed.", status=405)


"""def update_end_event():
    while True:
        try:
            event = EndEvent.objects.get(endEventId=5747)
            new_end_time = event.endEvent - timedelta(milliseconds=500)
            EndEvent.objects.filter(endEventId=5747).update(endEvent=new_end_time)
            print("EndEvent updated:", new_end_time)
        except EndEvent.DoesNotExist:
            print("EndEvent not found")
        
        time.sleep(2)

update_end_event()
    """


def subtract_until_zero(number, subtract_by):
    Player.objects.all().update(results="seen")
    event = EndEvent.objects.get(endEventId=85747)
    while number > 0:
        event.endEvent = number
        event.save()
        number -= subtract_by
        if number < 0:
            number = 0
        time.sleep(1)
        if event.endEvent < 10000:
            Player.objects.all().update(results="not seen")

    print("Number has reached 0!")
    transferData()
    time.sleep(3)
    code1 = 85747
    getCode = Leaderboard.objects.get(leaderBoardId=5747)
    getCode.leaderBoardId = code1
    getCode.save()
    time.sleep(3)
    getCode2 = TypingArea.objects.get(typingAreaId=5747)
    getCode2.typingAreaId = code1
    getCode2.save()


def setEventNext(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            ms = data.get("ms")

            if ms is not None:
                try:
                    event = NextEvent.objects.get(nextEventId=5747)
                    event.nextEvent = ms
                    event.save()
                    return HttpResponse("Event next updated successfully.", status=200)
                except NextEvent.DoesNotExist:
                    return HttpResponse("Event not found.", status=404)
            else:
                return HttpResponse("Invalid data format.", status=400)
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data.", status=400)
        except Exception as e:
            return HttpResponse(f"An error occurred: {str(e)}", status=500)
    else:
        return HttpResponse("Method not allowed.", status=405)


def getPlayerData(request):
    if request.method == "POST":
        player = json.loads(request.body)
        playerId = player.get("userId")
        getPlayer = Player.objects.filter(player_id=playerId)

        if getPlayer.exists():
            playerResults = getPlayer.values()
            return JsonResponse({"playerResults": list(playerResults)})
        else:
            return JsonResponse({"error": "Player not found"}, status=400)


def startLeaderBoard(request):
    if request.method == "POST":
        code = json.loads(request.body)
        code1 = code["firstId"]
        if code1 == 85747:
            getCode = Leaderboard.objects.get(leaderBoardId=5747)
            getCode.leaderBoardId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        elif code1 == 5747:
            getCode = Leaderboard.objects.get(leaderBoardId=85747)
            getCode.leaderBoardId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        else:
            return HttpResponse("UPDATE FAILED...")
    else:
        return HttpResponse("something went wrong")


def startTypingArea(request):
    if request.method == "POST":
        code = json.loads(request.body)
        code1 = code["firstId"]
        if code1 == 85747:
            getCode = TypingArea.objects.get(typingAreaId=5747)
            getCode.typingAreaId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        elif code1 == 5747:
            getCode = TypingArea.objects.get(typingAreaId=85747)
            getCode.typingAreaId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        else:
            return HttpResponse("UPDATE FAILED...")
    else:
        return HttpResponse("something went wrong")


def startFrontend(request):
    if request.method == "POST":
        code = json.loads(request.body)
        code1 = code["firstId"]
        print(code1)
        if code1 == 85747:
            getCode = Frontend.objects.get(FrontendId=5747)
            getCode.FrontendId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        elif code1 == 5747:
            getCode = Frontend.objects.get(FrontendId=85747)
            getCode.FrontendId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        else:
            return HttpResponse("UPDATE FAILED...")
    else:
        return HttpResponse("something went wrong")


def startTimerOne(request):
    if request.method == "POST":
        code = json.loads(request.body)
        code1 = code["firstId"]
        if code1 == 85747:
            getCode = EndEvent.objects.get(endEventId=5747)
            getCode.endEventId = code1
            getCode.save()
            subtract_until_zero(getCode.endEvent, 1000)
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        elif code1 == 5747:
            getCode = EndEvent.objects.get(endEventId=85747)
            getCode.endEventId = code1
            getCode.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        else:
            return HttpResponse("UPDATE FAILED...")
    else:
        return HttpResponse("something went wrong")


def starEvent1(request):
    if request.method == "POST":
        code = json.loads(request.body)
        code1 = code["firstId"]
        if code1 == 185747:
            getCode = Event1.objects.get(eventId=15747)
            getCode.eventId = code1
            getCode.save()

            code3 = 85747
            getCode4 = Leaderboard.objects.get(leaderBoardId=5747)
            getCode4.leaderBoardId = code3
            getCode4.save()
            time.sleep(5)
            getCode5 = TypingArea.objects.get(typingAreaId=5747)
            getCode5.typingAreaId = code3
            getCode5.save()

            return HttpResponse("UPDATED SUCCESSIFULLY...")
        elif code1 == 15747:
            getCode = Event1.objects.get(eventId=185747)
            getCode.eventId = code1
            getCode.save()

            code2 = 5747
            getCode3 = Leaderboard.objects.get(leaderBoardId=85747)
            getCode3.leaderBoardId = code2
            getCode3.save()
            time.sleep(5)
            getCode2 = TypingArea.objects.get(typingAreaId=85747)
            getCode2.typingAreaId = code2
            getCode2.save()
            return HttpResponse("UPDATED SUCCESSIFULLY...")
        else:
            return HttpResponse("UPDATE FAILED...")
    else:
        return HttpResponse("something went wrong")


def starEvent2(request):
    if request.method == "POST":
        try:
            code = json.loads(request.body)
            code1 = code.get("firstId")

            if code1 == 185747:
                getCode = Event2.objects.get(eventId=15747)
                getCode.eventId = code1
                getCode.save()

                code3 = 85747
                getCode4 = Leaderboard.objects.get(leaderBoardId=5747)
                getCode4.leaderBoardId = code3
                getCode4.save()
                time.sleep(5)
                getCode5 = TypingArea.objects.get(typingAreaId=5747)
                getCode5.typingAreaId = code3
                getCode5.save()

                return HttpResponse("UPDATED SUCCESSFULLY...")
            elif code1 == 15747:
                getCode = Event2.objects.get(eventId=185747)
                getCode.eventId = code1
                getCode.save()

                code2 = 5747
                getCode3 = Leaderboard.objects.get(leaderBoardId=85747)
                getCode3.leaderBoardId = code2
                getCode3.save()
                time.sleep(5)
                getCode2 = TypingArea.objects.get(typingAreaId=85747)
                getCode2.typingAreaId = code2
                getCode2.save()
                return HttpResponse("UPDATED SUCCESSFULLY...")
            else:
                return HttpResponse("UPDATE FAILED...")
        except json.JSONDecodeError as e:
            return HttpResponse(f"Error parsing JSON: {e}")
        except Event2.DoesNotExist as e:
            return HttpResponse("Event2 does not exist with the given eventId")
        except Leaderboard.DoesNotExist as e:
            return HttpResponse(
                "Leaderboard does not exist with the given leaderBoardId"
            )
        except TypingArea.DoesNotExist as e:
            return HttpResponse("TypingArea does not exist with the given typingAreaId")
        except Exception as e:
            return HttpResponse(f"An error occurred: {e}")
    else:
        return HttpResponse("Invalid request method")


def generateTicket():
    nums = ["1", "2"]
    random.shuffle(nums)
    nums3 = nums[1]
    nums4 = int(nums3)
    return nums4


def rewardData(request):
    if request.method == "POST":
        try:
            rewDat = json.loads(request.body.decode("utf-8"))
            rewDat2 = rewDat.get("rewardDat")
            adminId = rewDat.get("mail")

            freeTicket = generateTicket()
            admins = Admins_details.objects.filter(admin_id=adminId)
            if admins.exists():
                if rewDat2 == "ALL":
                    notfTitle1 = "Textornado rewards"
                    getTicketsDetails = Tickets.objects.all()
                    for tickets in getTicketsDetails:
                        if tickets.claim_tickets >= 1:
                            pass
                        else:
                            tickets.claim_tickets += freeTicket
                            tickets.save()
                    notfDes1 = f"You have received free {freeTicket} tickets from TextTornado rewards. Claim your tickets."
                    getUsers = Player.objects.all()
                    for getUser in getUsers:
                        saveNotification = Notification.objects.create(
                            tittle=notfTitle1,
                            description=notfDes1,
                            notf_id=getUser.player_id,
                        )
                        saveNotification.save()
                    return HttpResponse(
                        f"SUCCESSFULLY SENT {freeTicket} TICKETS TO ALL USERS"
                    )
                elif rewDat2 == "LEADERBOARD":
                    getReaderboardData = TypingDetails.objects.all()
                    for readerboard in getReaderboardData:
                        getTickets = Tickets.objects.filter(
                            tickets_id=readerboard.play_id
                        )
                        if getTickets.exists():
                            toReward = getTickets.first()
                            toReward.claim_tickets += freeTicket
                            toReward.save()
                        else:
                            return HttpResponse("NO ONE ON LEADERBOARD.")
                    notfTitle2 = "Leaderboard Rewards"
                    notfDes2 = f"You have received free {freeTicket} tickets from Leaderboard rewards. Claim your tickets."
                    getUsers2 = TypingDetails.objects.all()
                    for getUser in getUsers2:
                        saveNotification = Notification.objects.create(
                            tittle=notfTitle2,
                            description=notfDes2,
                            notf_id=getUser.play_id,
                        )
                        saveNotification.save()
                    return HttpResponse(
                        f"SUCCESSFULLY SENT {freeTicket} TICKETS TO USERS ON LEADERBOARD."
                    )
                else:
                    getPlayers = Player.objects.filter(username=rewDat2)
                    if getPlayers.exists():
                        getPlayers2 = getPlayers.first()
                        getTickets2 = Tickets.objects.filter(
                            tickets_id=getPlayers2.player_id
                        )
                        if getTickets2.exists():
                            toReward2 = getTickets2.first()
                            toReward2.claim_tickets += freeTicket
                            toReward2.save()
                            saveNotification = Notification.objects.create(
                                tittle="Accuracy  Rewards",
                                description=f"You have received free {freeTicket} tickets from accuracy  rewards. claim your tickets",
                                notf_id=toReward2.tickets_id,
                            )
                            saveNotification.save()
                            return HttpResponse(
                                f"SUCCESSFULLY SENT {freeTicket} TICKETS TO {str.upper(rewDat2)}"
                            )
                    else:
                        return HttpResponse("INVALID GENERIC OR USERNAME.")
            else:
                return HttpResponse("WE CAN'T PROCESS YOUR REQUEST..")
        except json.JSONDecodeError:
            return HttpResponse("Invalid JSON data in the request body.")
    else:
        return HttpResponse("Invalid request method. Only POST requests are allowed.")



def get_concern(request):
    if request.method == "POST":
        try:
            request_data = json.loads(request.body)
            userid = request_data.get("mail")
            getAdmin = Admins_details.objects.filter( admin_id = userid)
            if getAdmin.exists():
                concerns = Support.objects.all().order_by("-source_date")
                return JsonResponse({"concerns": list(concerns.values())})
            else:
                return HttpResponse("No concerns found.")
        except Exception as e:
            return HttpResponse("An error occurred while processing the request.")
    else:
        return HttpResponse("Bad request method. Use POST.")
    

def get_concern3(request):
    if request.method == "POST":
        try:
            request_data = json.loads(request.body)
            userid = request_data.get("userId")
            print(userid)
            getUserConcerns = Support.objects.filter(source_id = userid )
            if getUserConcerns.exists():
                concerns = getUserConcerns.all().order_by("source_date")
                return JsonResponse({"concerns": list(concerns.values())})
            else:
                return HttpResponse("No concerns found.")
        except Exception as e:
            return HttpResponse("An error occurred while processing the request.")
    else:
        return HttpResponse("Bad request method. Use POST.")

