import requests

BASE_URL = "http://localhost:5000"

def register_test():
    fullname = input('Enter fullname: ')
    username = input('Enter username: ')
    password = input('Enter password: ')
    confirm_password = input('Confirm password: ')
    response = requests.post(f'{BASE_URL}/api/auth/signup',json={
        'fullname' : fullname,
        'username': username, 
        'password': password,
        'confirmPassword': confirm_password
        })
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def login_test():
    username = input('Enter username: ')
    password = input('Enter password: ')
    response = requests.post(f'{BASE_URL}/api/auth/login',json={
        'username': username, 
        'password': password,
        })
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def logout_test():
    response = requests.post(f'{BASE_URL}/api/auth/logout')
    print(response.status_code)
    print(response.text)
    print(response.cookies.get_dict())

def main():
    response = "z"
    while response != "d":
        response = input(f'''
        Choose an action:\n
        a. registier test\n
        b. login test\n
        c. logout test\n
        d. exit
        ''')
        if response == "a": register_test()
        elif response == "b": login_test()
        elif response == "c": logout_test()
        else: break

if __name__ == '__main__':
    main()