#Dont run this file directly
import re
def Ask(question, type = ["num","str","num_and_str", "pass"], error_msg = "Input wrong"):
    temp_var = input(question)
    if(type == "num"):
        #Ask for answer containing number
        if(is_num(temp_var)):
            return temp_var
        else:
            print(error_msg)
            Ask(question, type, error_msg)

    elif(type == "str"):
        #ask for answer containing string
        if(is_str(temp_var)):
            return temp_var
        else:
            print(error_msg)
            Ask(question, type, error_msg)

    elif(type == "num_and_str"):
        #ask for number and string in one thing
        if(is_str_and_num(temp_var)):
            return temp_var
        else:
            print(error_msg)
            Ask(question, type, error_msg)

    elif(type == "pass"):
        #pass trough question
        return temp_var



def is_num(input_str):
    #checks for intigers
    return bool(re.match(r'^\d+$', input_str))

def is_dec(input_str):
    #checks for decimals in string
    return bool(re.match(r'^\d+(\.\d+)?$', input_str))

def is_str(input_str):
    #checks for JUST strings (a-z)
    return input_str.isalpha()

def is_str_and_num(input_str):
    #Checks if there are strings and numbers
    return bool(re.search(r'[a-zA-Z]\d', input_str)) or bool(re.search(r'\d[a-zA-Z]', input_str))

def contains_specific_strings(input_str, specific_strings):
    return any(specific_string in input_str for specific_string in specific_strings)

