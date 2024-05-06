import matplotlib.pyplot as plt

plt.plot(biking_days, biking_distances)
plt.title("Biking distances (KM) for the weekdays")
plt.xlabel('Date')
plt.ylabel('Distance in KM')
plt.style.use('ggplot')
plt.show()
