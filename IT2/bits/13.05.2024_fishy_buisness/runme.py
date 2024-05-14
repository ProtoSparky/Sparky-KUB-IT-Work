data_loc = "./DATA/data.csv"
import tools
import matplotlib.pyplot as plt
from collections import Counter
import numpy as np

'''
DATA to be saved 


• Dato for fangst.  
• Tidspunkt for fangst.  
• Hvor fisken ble fanget.  
• Art (hvilken slags fisk det er).  
• Lengde på fisken.  
• Vekt på fisken.  
• Redskap (Kan du avgrense det til: meitefiske, flue, spinner,  blink, garn, isfiske, dorge).  



TODO 

• Lagre data om hver fangst i filen/database.  
• Kunne redigere innhold i filen/database.  
• Lagre redigert innhold etter oppdatering.  
• Utskrift av alt innhold i filen/database i en strukturert tabell.  
• Vise antall fisk av hver art i søylediagram  
• Vise prosentvis mengde fisk i kilo av hver art i et sektordiagram.  
• Vise fangst fordelt på måneder. Velg her selv grafisk presentasjon. 
• Brukergrensesnitt må være intuitivt og delikat (pent å se på) 

'''

def setup():
    print("Setting up stuff")

    setup_data() #setup data if it wanst there from the beginning
    #AddFish()
    #EditRow("Date", 3, 100)
    #DisplayFishSpecies()
    DisplayWeightBySpecies()



def setup_data():

    if(tools.read_csv_raw(data_loc) == None):
        #creae file as it does not exist
        data = {"Date":[], "Time":[], "Location":[], "Species":[], "Fish_length":[], "Fish_weight":[], "Capture_tool":[]}
        tools.write_csv(data_loc, data)
    


def AddFish(Day=None,Month=None,Year=None,Time=None,Location=None,Species=None,Fish_length=None,Fish_weight=None,Capture_tool=None):
    #check if input vars are nonexistent
    if(Day == None and Month == None and Year == None and Time == None and Location == None and Species == None and Fish_length == None and Fish_weight == None and Capture_tool == None):
        #vars undefined, using Text UI
        print("vars not defined, launching text ui")

        Day = tools.Ask(question = "Which day was the fish caught (0-30)? : ", type = "num")
        Month = tools.Ask(question = "Which month was the fish caught (1-12)? : ", type = "num")
        Year = tools.Ask(question = "Which year was the fish caught? : ", type = "num")
        Time = tools.Ask(question = "On which time was the fish caught? : ", type = "num_and_str_special")
        Location = tools.Ask(question = "Where was the fish caught? : ", type = "pass")
        Species = tools.Ask(question = "Which specie is this fish? : ", type = "pass")
        Fish_length = tools.Ask(question = "---------\nHow long is the fish (cm)\ndont include cm \n: ", type = "dec")
        Fish_weight = tools.Ask(question = "---------\nHow heavy is the fish (grams)\ndont include g \n: ", type = "dec")
        Allowed_capture_tools = ["meitefiske", "flue", "spinner",  "blink", "garn", "isfiske", "dorge"]
        Capture_tool = tools.Ask(question = "---------\nWhat tool was used to capture \nAllowed tools " + str(Allowed_capture_tools) + "\n: ", type = "str_allowed", allowed_strings= Allowed_capture_tools)       
            
    else:
        print("vars drfined, adding fish to text file")



    #write data to DB
    
    ##get current data
    file = tools.read_csv(data_loc)
    ###i know that this permanent implementation is not ideal
    file["Date"].append(str(Day) + "." + str(Month) + "."+ str(Year))
    file["Time"].append(str(Time))
    file["Location"].append(Location)
    file["Species"].append(Species)
    file["Fish_length"].append(Fish_length)
    file["Fish_weight"].append(Fish_weight)
    file["Capture_tool"].append(Capture_tool)

    ##write to db
    tools.write_csv(data_loc, file, write_header=True,mode = "overwrite")


def EditRow(collunmName, row_id, new_data):
    file = tools.read_csv(data_loc)
    selected_collumn = file[collunmName]
    collumn_length = len(selected_collumn)
    if(row_id > (collumn_length -1)):
        print("Selected collumn is bigger than amount of collumns | Index 0-" + str(collumn_length - 1))
        return None
    file[collunmName][row_id] = new_data
    tools.write_csv(data_loc, file, write_header=True,mode = "overwrite")


def DisplayFishSpecies():
    file = tools.read_csv(data_loc)
    species = file["Species"]
    counted = Counter(species)
    fish_names = []
    fish_amounts = []
    color = []
    for current_counted in counted:
        fish_names.append(current_counted)
        fish_amounts.append(counted[current_counted])
        col = (np.random.random(), np.random.random(), np.random.random())
        color.append(col)
    fig, ax = plt.subplots()
    ax.bar(fish_names, fish_amounts, label=fish_names, color = color )
    ax.set_ylabel('Fish specie amount')
    ax.set_title('Fish')
    ax.legend(title='Fish species')

    plt.show()
            

def DisplayWeightBySpecies():
    #Vise prosentvis mengde fisk i kilo av hver art i et sektordiagram.
    file = tools.read_csv(data_loc)
    species = file["Species"]
    fish_weight = file["Fish_weight"]
    fish_species_sorted = Counter(species) #List of all fish as amount
    fish_weight_int = tools.str_arr_to_int(fish_weight)
    total_fish_weight = sum(fish_weight_int) #Total weight of all the species of fish in grams

    #find total weight for the different species
    species_names = []
    weight_by_fish_species = []
    for current_specie in fish_species_sorted: 
        species_names.append(current_specie) #append current fish name to make a clean array with names
        fish_indexes = tools.find_indexes(species, current_specie)
        total_specie_weight = 0
        #check all keys for weight, and append that to the total weight 
        for current_index in fish_indexes:
            current_fish_weight = (fish_weight[current_index])
            total_specie_weight = total_specie_weight + float(current_fish_weight)
        weight_by_fish_species.append(total_specie_weight)
    
    percentage_fish_weight = [(amount / total_fish_weight) * 100 for amount in weight_by_fish_species]

    plt.pie(percentage_fish_weight, labels=species_names, autopct='%1.1f%%')
    plt.title('Percentage of weight by fish species')
    plt.show()




setup()