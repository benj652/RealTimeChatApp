import requests
from authentication_tests import login_test, logout_test

BASE_URL = "http://localhost:5000"

def send_message_test():
    target_id = input('Enter target id: ')
    messege = input('Enter messege: ')
    response = requests.post(f'{BASE_URL}/api/messages/send/{target_id}',json={
        'message': messege
        })
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def get_message_test():
    target_id = input('Enter target id: ')
    response = requests.post(f'{BASE_URL}/api/messages/{target_id}')
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def main():
    response = "z"
    while response != "e":
        response = input(f'''
        Choose an action:\n
        a. login test\n
        b. logout test\n
        c. send message test\n
        d. get message test\m
        e. exit
        ''')
        if response == "a": login_test()
        elif response == "b": logout_test()
        elif response == "c": send_message_test()
        elif response == "d": get_message_test()
        else: break

if __name__ == '__main__':
    main()