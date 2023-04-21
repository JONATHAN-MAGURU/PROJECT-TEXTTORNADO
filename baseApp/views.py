from django.shortcuts import render, HttpResponse , redirect
from datetime import datetime
from datetime import date
import json
from baseApp.models import Admins_details , Aunthaticate


def ttd_admin_login(request):
    return render(request, 'ttd_admin_login.html')



def ttd_admin_signin(request):
    return render(request, 'ttd_admin_signin.html')

def ttd_admin_homepage(request):
     if request.method =='POST':
        username = request.POST['username']
        password = request.POST['password']
        details = Admins_details.objects.filter(emails = username, passw = password)
        if details.exists():
            date1 = datetime.now()
            admin_details = details.values()
            admin_details2 = Admins_details.objects.all().values()
            amount_of_admins = len(admin_details2)
            return render(request,'ttd_admin_homepage.html',{
                'admin_details':admin_details,
                'admin_details2':admin_details2,
                'date1':date1, 
                'amount_of_admins': amount_of_admins
                 })
        else:
            return HttpResponse("Failed to connect")
     return redirect('ttd_admin_login')
    

