import matplotlib.pyplot as plt
biking_distances = [10, 40, 50, 14, 50, 50, 40]
biking_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

plt.plot(biking_days, biking_distances)
plt.title("Biking distances (KM) for the weekdays")
plt.xlabel('Date')
plt.ylabel('Distance in KM')
plt.style.use('ggplot')
plt.show()
