from src.Setup import Setup
from src.Mail.MailQ import MailQ


TESTDATA = [
    {
        "email": "zrmmaster92@gmail.com",
        "username" : "Zach"
    }
]

Setup.init_thread_resources()

mailQ: MailQ = MailQ.get_mail_q()

keys = mailQ.get_keys()

for key in keys:
    mailQ.delete_item(key)

for data in TESTDATA:
    mailQ.add_to_q(data)
