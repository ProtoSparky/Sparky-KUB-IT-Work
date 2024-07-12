import tools as tk
import os
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
    clean_csv(old_csv_dir, new_csv_dir, ignore_first_lines = 1) #setup a clean csv file for all the other stuff to use
    csv_file = tk.read_csv(new_csv_dir, encoding = "1252")
    csv_keys = list(csv_file.keys())
    csv_length = len(csv_file[csv_keys[0]])
    #Lag et program som presenter dataene fra datasettet i en tabellignende visning med følgende kolonner: «Aktivitet», «Kjønn» og «Tidsbruk».
    display_object_tui(csv_file)
    os.remove(new_csv_dir) #remove temp file when code is finished




def display_object_tui(file):
    #Lag et program som presenter dataene fra datasettet i en tabellignende visning med følgende kolonner: «Aktivitet», «Kjønn» og «Tidsbruk».
    keys = list(file.keys())
    keys_with_index = keys.copy() #prevent data from being added to a variable that was defined by another one
    index = "Index"
    keys_with_index.insert(0, index)
    longest_str = tk.find_longest_string(file)
    max_tbl_length = len(file[keys[0]])

    #####
    #I dont like this solution either
    header = "/ analyse av tidsbruk i div aktiviteter \\"
    header_len = len(header)
    header_str = ""
    for current_collumn in keys_with_index:
        header_str = header_str + tk.pad_string(desired_length = longest_str, original_string = current_collumn)
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
                printed_str = printed_str + "| " + tk.pad_string(desired_length = longest_str, original_string = current_collumn) + " |"            
            print(printed_str)

        else:
            printed_str = ""
            for current_collumn in keys_with_index:
                if(current_collumn == index):
                    if(tbl_pointer < 10):
                        printed_str = printed_str + "| " + tk.pad_string(desired_length = longest_str, original_string = "0"+str(tbl_pointer)) + " |"
                    else:
                        printed_str = printed_str + "| " + tk.pad_string(desired_length = longest_str, original_string = str(tbl_pointer)) + " |"
                else:
                    printed_str = printed_str + "| " + tk.pad_string(desired_length = longest_str, original_string = file[current_collumn][tbl_pointer],) + " |"

            print(printed_str)

        tbl_pointer += 1  


runner()