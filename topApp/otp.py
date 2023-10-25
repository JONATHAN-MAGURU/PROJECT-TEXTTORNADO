from twilio.rest import Client
from baseApp.models import Aunthaticate


class MessageHandler:
    def __init__(self, phone_number) -> None:
        self.phone_number = phone_number

    def send_otp_on_phone(self):
        try:
            get_sid = Aunthaticate.objects.filter(aunth_name="account_sid").first()
            get_aunth = Aunthaticate.objects.filter(aunth_name="auth_token").first()
            get_messaging_service_sid = Aunthaticate.objects.filter(
                aunth_name="messaging_service_sid"
            ).first()

            account_sid = get_sid.v_code
            auth_token = get_aunth.v_code
            messaging_service_sid = get_messaging_service_sid.v_code

            client = Client(account_sid, auth_token)

            verification = client.verify.v2.services(
                messaging_service_sid
            ).verifications.create(self.phone_number, channel="sms")

            print(f"OTP message sent successfully, {verification.status}")
        except Exception as e:
            print(f"Error sending OTP message {e}")
