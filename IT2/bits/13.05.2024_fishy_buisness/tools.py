#Dont run this file directly
import re
import csv
import os
def Ask(question, type = ["num","str","num_and_str", "pass", "num_and_str_special", "dec", "str_allowed"], error_msg = "Input wrong", allowed_strings = []):
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
    
    elif(type == "num_and_str_special"):
        #ask for number and string in one thing including :,;
        if(is_str_and_num_special(temp_var)):
            return temp_var
        else:
            print(error_msg)
            Ask(question, type, error_msg)

    elif(type == "dec"):
        #ask for answer containing number with decimal
        if(is_dec(temp_var)):
            return temp_var
        else:
            print(error_msg)
            Ask(question, type, error_msg)

    elif(type == "str_allowed"):
        #ask for answer containing allowed strings
        if(contains_specific_strings(temp_var, allowed_strings)):
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

def is_str_and_num_special(input_str):
    # Checks if there are strings and numbers, including : and,
    return bool(re.search(r'[a-zA-Z\d:,;]', input_str)) or bool(re.search(r'[:;,]\d[a-zA-Z]', input_str))


def read_csv(file_path, delimiter = ";"):
    """
    Reads a CSV file and returns its contents as a list of dictionaries.
    
    :param file_path: Path to the CSV file.
    :return: A list of dictionaries representing the rows of the CSV file.
             Returns None if the file does not exist.
    """
    if not os.path.exists(file_path):
        return None
    
    try:
        with open(file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file, delimiter = delimiter)
            return list(reader)
    except FileNotFoundError:
        return None

def write_csv(file_path, data, delimiter = ";"):
    """
    Writes a dictionary to a CSV file, creating the file if it does not exist.
    Writes empty arrays as empty rows in the CSV file.
    
    :param file_path: Path to the CSV file.
    :param data: Dictionary where keys are column headers and values are lists of data.
    """
    # Check if the directory exists, if not, create it
    directory = os.path.dirname(file_path)
    if not os.path.exists(directory):
        os.makedirs(directory)
    
    try:
        with open(file_path, mode='a', encoding='utf-8', newline='') as file:
            writer = csv.writer(file, delimiter = delimiter)
            # Write the header row
            writer.writerow(data.keys())
            # Check if any list in data is empty
            if any(not values for values in data.values()):
                # Write an empty row if any list is empty
                writer.writerow([])
            else:
                # Write the data rows
                for values in zip(*data.values()):
                    writer.writerow(values)
    except FileNotFoundError:
        return None

