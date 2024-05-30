import tools as tk
import numpy
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
category_array_in_file = csv_file["Category"] #This is the category column in the CSV file
while category_pointer < csv_file_length:
    #iterate trough all rows
    current_category_in_file = category_array_in_file[category_pointer]
    try:
        categories[current_category_in_file].append(category_pointer) #If the category exists in the object, append the current key containing the category
    except:
        categories[current_category_in_file] = [] #if the current category does not exist, make one and do the same as in try:
        categories[current_category_in_file].append(category_pointer)     
    category_pointer += 1 

#we convert all of those object keys in the category to amount of apps in the given category
length_by_category = {}
for current_cat in categories:
    category_length = len(categories[current_cat])
    length_by_category[current_cat] = category_length

#use premade function for sorting keys by values. 
length_by_category_sorted = tk.sort_dict(length_by_category, ascending = False)


def GetAppRatingsAndInstallations(decending_app_amount, sorted_appList, category_keys,csv_file ):
    category_list = list(sorted_appList.keys()) 
    first_x = []
    pointer = 0
    #We get the first x amount of categories for use later
    while pointer < decending_app_amount:
        first_x.append(category_list[pointer])
        pointer += 1

    return_data = {}
    #we iterate trough this category
    for current_category in first_x: 
        #get all array keys for given category 
        current_category_keys = category_keys[current_category] 

        temp_rating = []
        temp_installs = []
        for current_category_key in current_category_keys: 
            #we iterate trough all array keys from the csv file for the given category
            current_cating = csv_file["Rating"][current_category_key]
            if(current_cating != "NaN"): #some of the values contain NaN. We want to filter away those as tht will skew our results
                current_cating = float(current_cating)
                temp_rating.append(current_cating)

            #now we check for the installs
            current_installs = csv_file["Installs"][current_category_key]
            if(current_installs != "NaN"): 
                current_installs = current_installs.replace("+","")
                current_installs = current_installs.replace(",","")
                current_installs = int(current_installs)
                temp_installs.append(current_installs)
        temp_rating_mean = numpy.mean(temp_rating) #We make a mean or average number from the array
        temp_installs_mean = numpy.mean(temp_installs)
        return_data[current_category] = { #We construct a containier for which we return all data
            "average_installs":temp_installs_mean, 
            "average_ratings":temp_rating_mean, 
            "app_amount": sorted_appList[current_category]
        }
    return return_data #We return the data






print(GetAppRatingsAndInstallations(3, length_by_category_sorted, categories,csv_file))