#Dont run this file directly
import re
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

print(is_str("1234e"))

def Ask(question, type = ["number, str, num_and_str"], error_msg = "Input wrong"):
    temp_var = input(question)
    if(type == "number"):
        #Ask for answer containing number
        if(is_num(temp_var)):
            return temp_var
    elif(type == "str"):
        #ask for answer containing string
        if(is_num(temp_var)):
            return temp_var
    elif(type == "num_and_str"):
        #ask for number and string in one thing
        print("test")