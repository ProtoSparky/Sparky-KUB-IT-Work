import tools as tk
import os
import eksamen_tools as ektk
import matplotlib.pyplot as plt
import numpy as np
old_csv_dir = "./Vedlegg_2_Datasett/05994_20240126-145813-csv.csv"
new_csv_dir = "./Vedlegg_2_Datasett/temp_csv.csv"



def clean_csv(old_dir, new_dir, ignore_first_lines = 2):
    #this function should be run to remove the first 2 lines of the csv file as they're not valid to syntax
    new_file = open(new_dir, "a")
    with open(old_dir, mode='r', encoding="1252") as file:
        counter = 0
        for current_line in file:
            if counter > ignore_first_lines:
                ##write  line               
                new_file.write(current_line)
            counter += 1
    new_file.close()






def runner(): 
    try:
        os.remove(new_csv_dir) #remove temp file if code crashed previous run
    except:
        pass
    clean_csv(old_csv_dir, new_csv_dir, ignore_first_lines = 1) #setup a clean csv file for all the other stuff to use
    csv_file = tk.read_csv(new_csv_dir, encoding = "1252")

    '''

    et stolpediagram som viser fordelingen av tidsbruk på aktivitetene for det valgte kjønnet 
        – hver aktivitet skal være representert med en stolpe, 
        og høyden på stolpen skal vise tidsbruken for aktivitetene for det valgte kjønnet i punkt b
    et sektordiagram som viser andelen tid av døgnet brukt på hver kategori av aktiviteter for det valgte kjønnet i punkt b
'''

    genders_indexed = sort_by_gender(csv_file)
    user_input = tk.Ask(question = "velg et kjønn mellom " + str(list(genders_indexed.keys())) + " ", type = "str_allowed", allowed_strings = list(genders_indexed.keys()))
    gender_selected = select_gender(genders_indexed[user_input], csv_data = csv_file)
    print(list(gender_selected.keys()))

    tmp_arr = []
    rand_col = []
    activities = []
    #convert str num to numbers
    length = len(gender_selected[list(gender_selected.keys())[0]])
    pointer = 0
    while pointer < length: 
        if("¬" not in gender_selected["alle aktiviteter"][pointer]):
            float_num = float(gender_selected["Tidsbruk 2000 I alt"][pointer])
            tmp_arr.append(float_num)
            col = (np.random.random(), np.random.random(), np.random.random())
            rand_col.append(col)
            activities.append(gender_selected["alle aktiviteter"][pointer])


        pointer += 1    

    
    fig, ax = plt.subplots()
    ax.bar(activities, tmp_arr, label=activities, color = rand_col )
    ax.set_ylabel('Alle aktiviteter etter timer for ' + user_input + " basert på timer")
    ax.set_title('alle aktiviteter for ' + user_input)
    ax.legend(title='Aktiviteter')

    plt.show()



    os.remove(new_csv_dir) #remove temp file when code is finished



def sort_by_gender(csv_file):
    csv_keys = list(csv_file.keys())
    csv_length = len(csv_file[csv_keys[0]])
    genders = ["Menn", "Kvinner", "Alle"]
    gender_index = {} #this is where we will store our array keys for the different genders

    #we iterate trough all gender rows in the gender column
    gender_column = csv_file["kjønn"]
    gender_pointer = 0
    while gender_pointer < csv_length:
        current_line = gender_column[gender_pointer]
        if(current_line in genders): #check so we dont save more than what is saved in var gender
            #try to save gender pointer
            try:
                gender_index[current_line].append(gender_pointer)
            except:
                gender_index[current_line] = []
                gender_index[current_line].append(gender_pointer)
    
        gender_pointer += 1
    return gender_index


def select_gender(indexed_keys, csv_data):
    temp_storage = {}
    for current_row in indexed_keys:
        for current_column in list(csv_data.keys()):
            current_row_txt = csv_data[current_column][current_row]
            try:
                temp_storage[current_column].append(current_row_txt)
            except:
                temp_storage[current_column]= []
                temp_storage[current_column].append(current_row_txt)
    return temp_storage





runner()
