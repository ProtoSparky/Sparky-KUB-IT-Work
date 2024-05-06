#this script inputs distance driven, and plots that
import matplotlib.pyplot as plt
UserData = {}
Temp = None
def InputUsername():
    '''
    username = input("Enter username: ")
    UserData[username] = {}
    UserData[username]["days"] = InputDays()
    UserData[username]["distance"] = InputDistance(username)
    print(UserData)
    '''
    print(Ask4Number("monday"))

def InputDays():
    Inputting = True
    days = []
    while Inputting:
        day = input("Input day for one of the measurements ")
        continue_str = input("Continue (y/n)")
        if(continue_str == "y"):
            #donothing
            Inputting=  True
        elif(continue_str == "n"):
            Inputting = False
        else:
            print("Command "+ continue_str + "not understood. Try again!")
        days.append(day)
    return days

def InputDistance(username):
    selected_user = UserData[username]
    user_days = selected_user["days"]
    temp_array = []
    for select_day in user_days: 
        km = Ask4Number(select_day)
        temp_array.append(km)
    return temp_array
        

def Ask4Number(current_day):
    distance = input("Enter distance biked for " + current_day + " ")
    try:
        val = int(distance)
        return val
    except ValueError:
        print("That's not a number!")
        distance = Ask4Number(current_day)


#start the script
InputUsername()
        

