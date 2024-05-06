import matplotlib.pyplot as plt
biking_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

multi_user_distances = {
    "Ole":[20, 30, 0, 14, 45, 30, 60],
    "Jens":[10, 40, 50, 14, 50, 50, 40]
}
multi_user_increasing = {}

users = multi_user_distances.keys()


#iterate trough users and append to temp array
for current_user in users:
    selected_user_distance = multi_user_distances[current_user]
    biking_length = len(selected_user_distance)
    multi_user_increasing[current_user] = []

    pointer = 0
    while pointer < biking_length:
        if(pointer < 1):
            multi_user_increasing[current_user].append(selected_user_distance[pointer])
        else:
            multi_user_increasing[current_user].append(int(multi_user_increasing[current_user][pointer -1]) + int(selected_user_distance[pointer]))
        pointer +=1 

    ##add plot for selected user
    plt.plot(biking_days, multi_user_increasing[current_user], label  = current_user)




#plt.plot(biking_days, biking_distances)
plt.title("Biking distances (KM) for a week")
plt.xlabel('Date')
plt.ylabel('Distance in KM')
plt.style.use('ggplot')
plt.legend() 
plt.show()
plt.savefig('Biking distances_(KM)_for_a_week.png') #save as image
