#this script inputs distance driven, and plots that
import matplotlib.pyplot as plt
UserData = {}
Temp = None
def InputUsername():    
    username = input("Enter username: ")
    UserData[username] = {}
    UserData[username]["days"] = InputDays()
    UserData[username]["distance"] = InputDistance(username)
    UserData[username]["temp"] = InputTemperature(username)
    Sum_total_km()
    PlotData()
    

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
        km = Ask4Number(select_day, "Enter distance biked for ")
        while km[1]:
            km = Ask4Number(select_day, "Enter distance biked for ")
        temp_array.append(km[0])
    return temp_array

def InputTemperature(username): 
    selected_user = UserData[username]
    user_days = selected_user["days"]
    temp_array = []
    for select_day in user_days: 
        km = Ask4Number(select_day, "Enter Temperature for ")
        while km[1]:
            km = Ask4Number(select_day, "Enter Temperature for ")
        temp_array.append(km[0])
    return temp_array 

def Ask4Number(current_day, InputText):
    distance = input(InputText + current_day + " ")
    try:
        val = int(distance)
        return [val, False]
    except ValueError:
        print("That's not a number!")
        return [None, True]

def Sum_total_km():
    all_users = UserData.keys()
    for select_user in all_users:
        select_user_data = UserData[select_user]
        distance = select_user_data["distance"]
        distance_len = len(distance)
        dist_pointer = 0 
        UserData[select_user]["distance_sum"] = []
        while dist_pointer < distance_len:
            if(dist_pointer < 1):                
                UserData[select_user]["distance_sum"].append(distance[dist_pointer])
            else:
                UserData[select_user]["distance_sum"].append(int(UserData[select_user]["distance_sum"][dist_pointer -1]) + int(distance[dist_pointer]))
            dist_pointer +=1

def PlotData():
    all_users = UserData.keys()
    #show km
    plt.title("Biking distances (KM) for a week")
    for select_user in all_users:
        plt.plot(UserData[select_user]["days"], UserData[select_user]["distance_sum"], label  = select_user)
    plt.xlabel('Date')
    plt.ylabel('Distance in KM')
    plt.style.use('ggplot')
    plt.legend() 
    plt.show()

    #show temp
    plt.title("Temperatures during Biking (C) for a week")
    for select_user in all_users:
        plt.plot(UserData[select_user]["days"], UserData[select_user]["temp"], label  = select_user)
    plt.xlabel('Date')
    plt.ylabel('Temperature Degrees celcius')
    plt.style.use('ggplot')
    plt.legend() 
    plt.show()

#start the script
InputUsername()
        

