import matplotlib.pyplot as plt
biking_distances = [20, 30, 0, 14, 45, 30, 60]
biking_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
temp_array = []

biking_distance_len = len(biking_distances)
pointer = 0
while pointer < biking_distance_len:
    if(pointer < 1):
        temp_array.append(biking_distances[pointer])
    else:
        print(biking_distances[pointer -1])
        temp_array.append(int(temp_array[pointer -1]) + int(biking_distances[pointer]))
    pointer +=1 

print(temp_array)
plt.plot(biking_days, temp_array)
plt.title("Biking distances (KM) for the weekdays")
plt.xlabel('Date')
plt.ylabel('Distance in KM')
plt.style.use('ggplot')
plt.show()
