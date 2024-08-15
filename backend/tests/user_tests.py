import requests
from authentication_tests import login_test, logout_test

BASE_URL = "http://localhost:5000"

def get_users_test():
    response = requests.get(f'{BASE_URL}/api/users')
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def get_user_test():
    id = input("Enter target user id: ")
    response = requests.get(f'{BASE_URL}/api/users/user/{id}')
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
        c. get users test\n
        d. get user test\n
        e. exit
        ''')
        if response == "a": login_test()
        elif response == "b": logout_test()
        elif response == "c": get_users_test()
        elif response == "d": get_user_test()
        else: break

if __name__ == '__main__':
    main()