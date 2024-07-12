#this is a dependency. Do not run me
import tools as tk
def display_object_tui(file, header):
    keys = list(file.keys())
    keys_with_index = keys.copy() #prevent data from being added to a variable that was defined by another one
    index = "Index"
    keys_with_index.insert(0, index)
    longest_str = tk.find_longest_string(file)
    max_tbl_length = len(file[keys[0]])

    #####
    #I dont like this solution either
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