import pandas
import matplotlib.pyplot as plt
import datetime
import numpy as np
import matplotlib.dates as mdates # Correct import statement
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
        city_index.append([file_array["dt"][pointer],float(file_array["AverageTemperature"][pointer])])
        city_found = True
    elif(city_found == True and file_array["City"][pointer] != find_city):
        #stops loop once all keys are found
        pointer = total_keys - 1 #compensate for added key by pointer
    pointer += 1

print("------")
print(city_index)





dates = [datetime.datetime.strptime(date, "%Y-%m-%d") for date, _ in city_index]
values = [value for _, value in city_index]

# Plotting
fig, ax = plt.subplots()
ax.plot(dates, values)

# Adjusting the locator to generate ticks for each year
ax.xaxis.set_major_locator(mdates.DayLocator(interval=365 * 50)) # every 10 years
#ax.xaxis.set_major_formatter(mdates.ConciseDateFormatter(ax.xaxis.get_major_locator()))
ax.xaxis.set_major_locator(mdates.YearLocator())

plt.title('Temperatures for ' + find_city + " 1700 - 2013")
plt.xlabel('Date')
plt.ylabel('Temperature (C)')
plt.style.use('ggplot')
plt.gcf().autofmt_xdate() # Rotate date labels automatically
plt.show()