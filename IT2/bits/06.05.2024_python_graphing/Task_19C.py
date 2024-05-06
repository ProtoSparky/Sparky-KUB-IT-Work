import matplotlib.pyplot as plt
import json
biking_distances = [20, 30, 0, 14, 45, 30, 60]
biking_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

multi_user_distances = {
    "Ole":[20, 30, 0, 14, 45, 30, 60],
    "Jens":[10, 40, 50, 14, 50, 50, 40]
}
multi_user_increasing = {}







plt.plot(biking_days, biking_distances)
plt.title("Biking distances (KM) for the weekdays")
plt.xlabel('Date')
plt.ylabel('Distance in KM')
plt.style.use('ggplot')
plt.show()
