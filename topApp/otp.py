from twilio.rest import Client
from texttornado import settings 

class MessageHandler:
    def __init__(self, phone_number) -> None:
        self.phone_number = phone_number

        
    def send_otp_on_phone(self):
        try:
            account_sid = settings.account_sid
            auth_token = settings.auth_token
            messaging_service_sid = settings.messaging_service_sid

            client = Client(account_sid, auth_token)

            verification = client.verify \
                     .v2 \
                     .services(messaging_service_sid) \
                     .verifications \
                     .create(self.phone_number, channel='sms')

            print("OTP message sent successfully")
        except Exception as e:
            print(f"Error sending OTP message {e}")





