#this script inputs distance driven, and plots that
import matplotlib.pyplot as plt
biking_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
temp_array = {}
temp2_array = {}
def Inputs():
    username = input("Enter username: ")
    temp_array[username] = [] #init array

    for current_day in biking_days: 
        value = Ask4Number(current_day)
        temp_array[username].append(value)
    temp2_array = sum_totals(username,temp_array)
    plotter(temp2_array)
   
    

def Ask4Number(current_day):
    distance = input("Enter distance biked for " + current_day + " ")
    try:
        val = int(distance)
        return val
    except ValueError:
        print("That's not a number!")
        Ask4Number(current_day)


def sum_totals(username, array):
    selected_user_data = array[username]
    user_inputs = len(selected_user_data)
    pointer = 0
    tmp_array = {}
    tmp_array[username] = []
    while pointer < user_inputs:
        if(pointer < 1):
            tmp_array[username].append(selected_user_data[pointer])
        else:
            tmp_array[username].append(int(tmp_array[username][pointer -1]) + int(selected_user_data[pointer]))
        pointer +=1 
    return(tmp_array)


def plotter(temp2_array):
    for selected_user in temp2_array:
        plt.plot(biking_days, temp2_array[selected_user], label  = selected_user)
    
    plt.title("Biking distances (KM) for a week")
    plt.xlabel('Date')
    plt.ylabel('Distance in KM')
    plt.style.use('ggplot')
    plt.legend() 
    plt.show()


Inputs()