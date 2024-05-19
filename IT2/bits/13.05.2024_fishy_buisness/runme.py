data_loc = "./DATA/data.csv"
import tools
import matplotlib.pyplot as plt
from collections import Counter
import numpy as np
import re


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

[x] Kunne redigere innhold i filen/database.  
[x]Lagre redigert innhold etter oppdatering.  
[X]Utskrift av alt innhold i filen/database i en strukturert tabell.  
[x]Vise antall fisk av hver art i søylediagram  
[x]Vise prosentvis mengde fisk i kilo av hver art i et sektordiagram.  
[ ]Vise fangst fordelt på måneder. Velg her selv grafisk presentasjon. 
[ ]Brukergrensesnitt må være intuitivt og delikat (pent å se på) 

'''

def setup():
    setup_data() #setup data if it wanst there from the beginning
    #AddFish()
    #EditRow("Date", 3, 100)
    #DisplayFishSpecies()
    #DisplayWeightBySpecies()
    #display_fishes_tui()
    #search_by_months()
    UI_Mode()



def setup_data():
    if(tools.read_csv_raw(data_loc) == None):
        print("Setting up stuff")
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
    total_fish_weight = sum(fish_weight_int) /1000 #Total weight of all the species of fish in kilograms

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
            total_specie_weight = total_specie_weight + (float(current_fish_weight) /1000)
        weight_by_fish_species.append(total_specie_weight)
    
    percentage_fish_weight = [(amount / total_fish_weight) * 100 for amount in weight_by_fish_species]

    plt.pie(percentage_fish_weight, labels=species_names, autopct='%1.1f%%')
    plt.title('Percentage of weight by fish species')
    plt.show()
   

def display_fishes_tui():
    file = tools.read_csv(data_loc)
    keys = list(file.keys())
    keys_with_index = keys.copy() #prevent data from being added to a variable that was defined by another one
    index = "Index"
    keys_with_index.insert(0, index)
    longest_str = find_longest_string(file)
    max_tbl_length = len(file[keys[0]])

    #####
    #I dont like this solution either
    header = "/ The Fish Table \\"
    header_len = len(header)
    header_str = ""
    for current_collumn in keys_with_index:
        header_str = header_str + tools.pad_string(desired_length = longest_str, original_string = current_collumn)
    header_str_len = len(header_str) * 1.4
    padding_amount = (header_str_len / 2) - (header_len / 2)
    padd_pointer = 0
    p_str = ""
    while padd_pointer < padding_amount:
        p_str += "="
        padd_pointer += 1
    p_str = p_str + header
    padd_pointer = 0
    while padd_pointer < padding_amount:
        p_str += "="
        padd_pointer += 1
    print(p_str)




    tbl_pointer = 0
    while tbl_pointer < max_tbl_length: 
        if(tbl_pointer == 0):
            printed_str = ""
            for current_collumn in keys_with_index:
                printed_str = printed_str + "| " + tools.pad_string(desired_length = longest_str, original_string = current_collumn) + " |"            
            print(printed_str)

        else:
            printed_str = ""
            for current_collumn in keys_with_index:
                if(current_collumn == index):
                    if(tbl_pointer < 10):
                        printed_str = printed_str + "| " + tools.pad_string(desired_length = longest_str, original_string = "0"+str(tbl_pointer)) + " |"
                    else:
                        printed_str = printed_str + "| " + tools.pad_string(desired_length = longest_str, original_string = str(tbl_pointer)) + " |"
                else:
                    printed_str = printed_str + "| " + tools.pad_string(desired_length = longest_str, original_string = file[current_collumn][tbl_pointer],) + " |"

            print(printed_str)

        tbl_pointer += 1
    

    
def find_longest_string(obj):
    longest_length = 0
    for key, value in obj.items():
        if isinstance(value, dict):
            nested_length = find_longest_string(value)
            longest_length = max(longest_length, nested_length)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, str):
                    longest_length = max(longest_length, len(item))
                else:
                    try:
                        item_str = str(item)
                        longest_length = max(longest_length, len(item_str))
                    except ValueError:
                        # Item cannot be converted to string
                        continue
        elif isinstance(value, str):
            longest_length = max(longest_length, len(value))
        else:
            # Convert non-string values to string and check
            try:
                value_str = str(value)
                longest_length = max(longest_length, len(value_str))
            except ValueError:
                # Value cannot be converted to string, skip
                continue
    return longest_length


def search_by_months():
    file = tools.read_csv(data_loc)
    dates = file["Date"]
    fish_weight = file["Fish_weight"]

    #extract all months and save their keys
    iterate_array = {}
    tmp_pointer  = 0
    for current_date in dates: 
        tmp_pointer += 1 #iterate this pointer as we need to keep track of which key we are working on
        month = (current_date.split(".",1)[1]).split(".",1)[0] #get month from "day:month:year"
        if month in iterate_array:
            iterate_array[month].append(tmp_pointer)
        else:
            iterate_array[month] = []
            iterate_array[month].append(tmp_pointer)
    
    fish_weight_by_month = {}
    #use extracted months to get the total fish weight
    for current_month in iterate_array: 
        current_month_keys = iterate_array[current_month]
        #iterate trough these keys
        total_weight = 0
        for current_weight_key in current_month_keys:
            current_weight = int(fish_weight[current_weight_key - 1])
            total_weight += current_weight
        fish_weight_by_month[int(current_month)]= (total_weight / 1000) #write total weight to new object and ocnvert to KG
    fish_weight_by_month = dict(sorted(fish_weight_by_month.items())) # sort keys
    return fish_weight_by_month
        




def UI_Mode():
    tools.Clear_Term()
    input_msg = """
Launch program with selected mode: 
    [1] Text based UI
    or 
    [2] Graphic UI
Type 1 or 2
    """
    #user_choise = input(input_msg)
    user_choise = "2" #Temporary
    if(user_choise == "1"):
        print("Text UI")
    elif(user_choise == "2"):
        print("Launching GUI")
        Spawn_Gui()
    else:
        UI_Mode()



def Spawn_Gui():
    assets = "./gui_assets/"
    import PySimpleGUI as sg

    #############################
    #############################
    #############################
    def DisplaySorter():
        #this is a helper function to sort the display from all fishes into something the GUI can understand
        file = tools.read_csv(data_loc)
        keys = list(file.keys()) #This will be our headers
        arrays = [] #This is where we will store our output data
        arr_len = len(file[keys[0]])
        pointer = 0
        while pointer < arr_len: 
            tmp_arr = []
            for current_key in keys:
                current_data = file[current_key][pointer]
                if(current_key == "Fish_weight"):
                    tmp_arr.append(int(current_data) / 1000)
                else:
                    tmp_arr.append(current_data)
            arrays.append(tmp_arr)  
            pointer += 1 
        return keys, arrays


    #############################
    #############################
    #############################
    sg.theme('DarkAmber')
    home_option = [
        [sg.Text("This is a fishy program")],
        [sg.Text("Click the tabs above to view the fishy fish options")],
        [sg.Button("Runner")]
    ]
    edit_db_option = [
        [sg.Text("Edit database")]
    ]
    display_fish_option = [
        [sg.Text("Here's a printout of all the caught fishes."), sg.Text("Fish weight is in kg, and fish length is in cm")],
        [sg.Text("When editing a date or time, remeber to add a 0 in in front of the number if your input does not have a proper number pair")],
        [sg.Table(
            values=DisplaySorter()[1], 
            headings=DisplaySorter()[0], 
            max_col_width=25,
            auto_size_columns=True,
            display_row_numbers=True,
            justification='left',
            num_rows=20,
            key='table_fish_output',
            select_mode='browse'
        )],
        [sg.Button("Refresh table", key = "refresh_table_fish_output"), sg.Button("Edit cell", key= "edit_table_fish_output"), sg.Button("Add new fish", key="add_fish")]
    ]

    species_pr_harvested_kg_option = [
        [sg.Text("This is where it'll display harvested fish pr species")]
    ]

    
    body =  [
        [sg.TabGroup([[
            sg.Tab('Home',home_option),
            sg.Tab ('Edit "Database"', edit_db_option),
            sg.Tab ('Fish species', display_fish_option),
            sg.Tab ('Harvested fish', species_pr_harvested_kg_option),
            
        ]])],
        [sg.Button('Close Program', key = "close")]
    ]




    window = sg.Window("F-I-S-H", body, icon = ("./gui_assets/ico.ico"))

    ######
    #Logic
    def RunFunc():
        print("ran")
        sg.popup("This is a test")

    # Create an event loop
    while True:
        event, values = window.read()
        if event == "Cancel" or event == sg.WIN_CLOSED:
            break
        if event == "close":
            break
        if(event == "edit_table_fish_output"):
            #edit selected row from fish output table
            table_selected = values["table_fish_output"]
            if(bool(table_selected) == False):
                #show error message
                sg.popup_error("Select a row first!")
            else:
                column_name_input = sg.popup_get_text("Enter the name of the column to be edited")
                #check that input matches any of th already existing column names
                file = tools.read_csv(data_loc)
                column_names = list(file.keys())
                if(str(column_name_input) in column_names):
                    new_txt = str(sg.popup_get_text("Enter text that will replace the previous text in the selected column"))
                    ##
                    #check for some input requirements
                    ##
                    if(str(column_name_input) == "Date"):
                        print("date")
                        if(re.match("^(0[0-9]|1[0-9]|2[0-9]|30|31)\.(0[1-9]|1[0-2])\.\d{4}$", new_txt)):
                            EditRow(str(column_name_input), table_selected[0],new_txt)
                        else:
                            sg.popup_error("Input does not match the column schema")
                    elif(str(column_name_input) == "Time"):
                        if(re.match("^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$", new_txt)):
                            EditRow(str(column_name_input), table_selected[0],new_txt)
                        else:
                            sg.popup_error("Input does not match the column schema")
                    elif(str(column_name_input) == "Fish_length"):
                        if(re.match("[0-9]+", new_txt)):
                            EditRow(str(column_name_input), table_selected[0],new_txt)
                        else:
                            sg.popup_error("Input does not match the column schema")
                    elif(str(column_name_input) == "Fish_weight"):
                        if(re.match("([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[Ee]([+-]?\d+))?",new_txt)):
                            new_input = str(int(float(new_txt) * 1000))
                            EditRow(str(column_name_input), table_selected[0],new_input)
                        else:
                           sg.popup_error("Input does not match the column schema") 
                    else:
                        EditRow(str(column_name_input), table_selected[0],new_txt)

                    window["table_fish_output"].update(values=DisplaySorter()[1]) # refresh table
                    print("Text edited")
                else:
                    sg.popup_error("Name of column cannot be found \nRemember to use correct capitalization") #Todo replace error popup with custom error popup
        if(event == "refresh_table_fish_output"):
            window["table_fish_output"].update(values=DisplaySorter()[1])
            print("updated table")
        if(event == "add_fish"): 
            popup_layout = [
                            [sg.Text('Enter details to submit a new fish to the database')],
                            #[sg.Text('Date'), sg.InputText(key='AddFish_Date')],
                            [sg.Text("Date"), sg.Text(""), sg.CalendarButton("Select Date", close_when_date_chosen=True, format='%d.%m.%Y', target = "AddFish_Date"), sg.In(key='AddFish_Date', enable_events=True, visible=False)],
                            #[sg.Text('Time'), sg.InputText("00-24",key='AddFish_Hour'), sg.Text(":"), sg.InputText("00-59",key = "AddFish_Minute")],
                            [sg.Text("Time"), sg.Slider((0, 24), orientation='horizontal', key = "AddFish_Hour"),sg.Text(":"),sg.Slider((0, 59), orientation='horizontal', key = "AddFish_Minute")],
                            [sg.Text("Location"), sg.InputText("", key = "AddFish_Location")],
                            [sg.Text("Species"), sg.InputText(key = "AddFish_Species")],
                            [sg.Text("Fish length (cm)"), sg.InputText(key = "AddFish_Fish_Length")],
                            [sg.Text("Fish weight (kg)"), sg.InputText(key = "AddFish_Fish_Weight")],
                            [sg.Text("Capture tool"), sg.Radio("Meitefiske", group_id = "AddFish_CaptureTool",default = True, key ="AddFish_CaptureTool_Meitefiske"),sg.Radio("Flue", group_id = "AddFish_CaptureTool",key ="AddFish_CaptureTool_Flue"),sg.Radio("Spinner", group_id = "AddFish_CaptureTool",key ="AddFish_CaptureTool_Spinner"),sg.Radio("Blink", group_id = "AddFish_CaptureTool",key ="AddFish_CaptureTool_Blink"), sg.Radio("Garn", group_id = "AddFish_CaptureTool",key ="AddFish_CaptureTool_Garn"), sg.Radio("Isfiske", group_id = "AddFish_CaptureTool",key ="AddFish_CaptureTool_IsFiske"), sg.Radio("Dorge", group_id = "AddFish_CaptureTool", key ="AddFish_CaptureTool_Dorge")], #As you can see i have absolutally no idea how do automate this without making it really complicated
                            [sg.Button('Save fish',key = "AddFish_Save")]
                            ]
            popup_window = sg.Window('Enter fishy details', popup_layout)
            while True:
                popup_event, popup_values = popup_window.read()
                if popup_event == sg.WINDOW_CLOSED:
                    break
                if(popup_event == "AddFish_Save"):
                    #check if input is proper
                    if(len(popup_values["AddFish_Date"]) == 0):
                        sg.Popup("Date not selected")
                    elif(len(str(popup_values["AddFish_Location"])) == 0):
                        sg.Popup("Location not present\nFill it out!")
                    elif(len(str(popup_values["AddFish_Species"])) == 0):
                        sg.Popup("Fish species not filled out")
                    elif(len(str(popup_values["AddFish_Fish_Length"])) == 0):
                        sg.Popup("Fish length not filled out")
                    elif(len(str(popup_values["AddFish_Fish_Weight"])) == 0):
                        sg.Popup("Fish weight not filled out")                    
                    else:  
                        AddFishDate = tools.extract_str_date(popup_values["AddFish_Date"])   
                        if(re.match("[0-9]*\.[0-9]+",popup_values["AddFish_Fish_Length"])):
                            Fish_length = int(float(popup_values["AddFish_Fish_Length"]))
                        else:
                            sg.Popup("Fish length is not a number, or using wrong delimiter\nIf youre using(,) use (.) instead\nIt must end with a decimal")
                            Fish_length = None
                        if(re.match("[0-9]*\.[0-9]+",popup_values["AddFish_Fish_Weight"])):
                            Fish_weight = int(float(popup_values["AddFish_Fish_Weight"]) * 1000)
                        else:
                            sg.Popup("Fish weight is not a number, or using wrong delimiter\nIf youre using(,) use (.) instead\nIt must end with a decimal")
                            Fish_weight = None
                        Fish_time = str(popup_values["AddFish_Hour"]) + ":" + str(popup_values["AddFish_Minute"])

                        #apply capture_data to one str
                        capture_tool = None
                        if(popup_values["AddFish_CaptureTool_Meitefiske"] == True):
                            capture_tool = "Meitefiske"
                        elif(popup_values["AddFish_CaptureTool_Flue"] == True):
                            capture_tool = "Flue"
                        elif(popup_values["AddFish_CaptureTool_Spinner"] == True):
                            capture_tool = "Spinner"
                        elif(popup_values["AddFish_CaptureTool_Blink"] == True):
                            capture_tool = "Blink"
                        elif(popup_values["AddFish_CaptureTool_Garn"] == True):
                            capture_tool = "Garn"
                        elif(popup_values["AddFish_CaptureTool_IsFiske"] == True):
                            capture_tool = "IsFiske"
                        elif(popup_values["AddFish_CaptureTool_Dorge"] == True):
                            capture_tool = "Dorge"
                        
                        if(Fish_weight==None or Fish_length==None or capture_tool == None):
                            sg.Popup("Please check that your submitted data meets the form requirements")
                        else:
                            if(sg.popup_yes_no("Do you want to save this fish to the database?") == "Yes"):
                                print("Saving fish")
                                AddFish(AddFishDate[0],AddFishDate[1],AddFishDate[2],Fish_time,str(popup_values["AddFish_Location"]),str(popup_values["AddFish_Species"]),Fish_length, Fish_weight,capture_tool)
                                window["table_fish_output"].update(values=DisplaySorter()[1])
                                popup_window.close()

                            else:
                                print("exiting add fish")
                                popup_window.close()
                    
                        


                        
                        

                        




            popup_window.close()



    window.close()




setup()