import pandas
import matplotlib.pyplot as plt
from datetime import datetime
#import dependency file
file_path = "./GlobalLandTemperaturesByCity.csv"
file_array = pandas.read_csv(file_path,delimiter=",")

#Find all keys for said city
find_city = "Århus"

city_index = []
total_keys = len(file_array)
pointer = 0
city_found = False
while pointer < total_keys:
    #iterate trough each row
    if(file_array["City"][pointer] == find_city):
        print("found city " + file_array["City"][pointer] + " " + str(pointer))
        city_index.append([file_array["dt"][pointer],file_array["City"][pointer],float(file_array["AverageTemperature"][pointer])])
        city_found = True
    elif(city_found == True and file_array["City"][pointer] != find_city):
        #stops loop once all keys are found
        pointer = total_keys - 1 #compensate for added key by pointer
    pointer += 1

print("------")
print(city_index)


#plot all data
plt.style.use('ggplot') 
plt.figure('Degrees for ' + find_city)
plt.plot(city_index["dt"], city_index["AverageTemperature"])
plt.show()