import pandas
import matplotlib.pyplot as plt
import datetime
import numpy as np
import matplotlib.dates as mdates 
import statistics
import math

#import dependency file
file_path = "./GlobalLandTemperaturesByCity.csv"
file_array = pandas.read_csv(file_path,delimiter=",")

#Find all keys for said city
find_city = "Århus"
data_points = 300


city_index = []
total_keys = len(file_array)
pointer = 0
city_found = False
while pointer < total_keys:
    #iterate trough each row
    if(file_array["City"][pointer] == find_city):
        print("found city " + file_array["City"][pointer] + " " + str(pointer))
        city_index.append([file_array["dt"][pointer],float(file_array["AverageTemperature"][pointer])])
        city_found = True
    elif(city_found == True and file_array["City"][pointer] != find_city):
        #stops loop once all keys are found
        pointer = total_keys - 1 #compensate for added key by pointer
    pointer += 1

print("------")
#print(city_index)



#create mean of numbers
mean_pointer = 0
meanify = []
meanify_dates = []
values_pr_point = len(city_index) / data_points 
while mean_pointer < data_points:
    #iterates trough all mean pointers

    #iterates trough values pr point
    vpp_pointer = 0
    temp_array = []
    temp_array.clear() #removes previous values from list
    while vpp_pointer < values_pr_point:
        city_pointer = vpp_pointer + mean_pointer #this pointer maps to the city index array
        city_data = city_index[city_pointer][1] #should get temperatures
        if(math.isnan(city_data)):
            city_data = 0 #should prevent NAN values from appearing in dataset
        temp_array.append(city_data)
        vpp_pointer += 1 

    #add dates
    meanify_dates.append(city_index[mean_pointer + data_points][0])

    #creates mean of values
    #print(temp_array)
    meanify.append(statistics.mean(temp_array))
    mean_pointer += 1

print(meanify)


'''

dates = [datetime.datetime.strptime(date, "%Y-%m-%d") for date, _ in city_index]
values = [value for _, value in city_index]

# Plotting
fig, ax = plt.subplots()
ax.plot(dates, values)

# Adjusting the locator to generate ticks for each year
ax.xaxis.set_major_locator(mdates.DayLocator(interval=365 * 100)) # every 10 years
#ax.xaxis.set_major_formatter(mdates.ConciseDateFormatter(ax.xaxis.get_major_locator()))
ax.xaxis.set_major_locator(mdates.YearLocator())
'''

plt.plot(meanify_dates,meanify)
plt.title('Temperatures for ' + find_city + " " + meanify_dates[0] + " - " + meanify_dates[len(meanify_dates) - 1])
plt.xlabel('Date')
plt.ylabel('Temperature (C)')
plt.style.use('ggplot')
plt.gcf().autofmt_xdate() # Rotate date labels automatically
plt.show()