import csv
import random
###
###
#This file creates a data file for the rest of the code in runme
###
###

species_list = ["Salmon", "Trout", "Perch", "Cod", "Flounder"]
capture_tools = ["meitefiske", "flue", "spinner", "blink", "garn", "isfiske", "dorge"]
cities = ["Oslo", "Bergen", "Trondheim", "ÅS", "Stavanger", "Malmø"]

with open('./DATA/data.csv', mode='w', newline='', encoding='utf-8' ) as file:
    writer = csv.writer(file, delimiter = ";")
    writer.writerow(["Date", "Time", "Location", "Species", "Fish_length", "Fish_weight", "Capture_tool"])
    
    for _ in range(100):
        date = str(random.randint(1,29)) + "." + str(random.randint(1,12)) + "." + str(random.randint(2000, 2024))
        time = str(random.randint(0,23)) + ":" + str(random.randint(0,59)) 
        location = cities[random.randint(0, len(cities) -1)]
        species = random.choice(species_list)
        fish_length = random.randint(0, 300)
        fish_weight = random.randint(0, 50000)
        capture_tool = random.choice(capture_tools)
        
        # Write the row to the CSV file
        writer.writerow([date, time, location, species, fish_length, fish_weight, capture_tool])

print("CSV file has been generated successfully.")