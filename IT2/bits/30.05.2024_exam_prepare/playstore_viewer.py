import tools as tk
#Lag et program som presenterer en oversikt over de tre største kategoriene målt i antall apper.
#Oversikten skal vise antallet apper, gjennomsnittsratingen og det gjennomsnittlige antallet 
#installasjoner for hver av disse tre kategoriene.
csv_file = tk.read_csv("googleplaystore.csv", delimiter = ",")
csv_file_keys = list(csv_file.keys()) #This is how we get the keys in an array in python
csv_file_length = len(csv_file[csv_file_keys[0]]) #we use the first column's length as the max length
print(csv_file_keys)



#we count how many times a given category pops up
categories = {}
category_pointer = 0
category_array_in_file = csv_file["Category"] #This is the category row in the CSV file
while category_pointer < csv_file_length:
    #iterate trough all rows
    current_category_in_file = category_array_in_file[category_pointer]
    try:
        categories[current_category_in_file].append(category_pointer) #If the category exists in the object, append the current key containing the category
    except:
        categories[current_category_in_file] = [] #
        categories[current_category_in_file].append(category_pointer)     
    category_pointer += 1 

#we create an empty array, and store the keys with the longest length first
category_by_app_amount = {}

for current_cat in categories:
    category_app_amount = len(categories[current_cat])
    if(len(category_by_app_amount) == 0):
        category_by_app_amount[current_cat] = category_app_amount
    else:
        #something is already in the category by app amount object
        for selected_app in category_by_app_amount:
            if(int(category_by_app_amount[selected_app]) <= category_app_amount):
                
    print(category_app_amount)

