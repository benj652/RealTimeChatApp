from authentication_tests import login_test, logout_test
import requests

BASE_URL = "http://localhost:5000"

def get_conversation_test():
    response = requests.get(f'{BASE_URL}/api/conversations/getchats')
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
        c. get conversation test\n
        d. exit
        ''')
        if response == "a": login_test()
        elif response == "b": logout_test()
        elif response == "c": get_conversation_test()
        else: break

if __name__ == '__main__':
    main()