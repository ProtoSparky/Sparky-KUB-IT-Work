import sqlite3 as testdb
import re
connect = testdb.connect('oppgave_3.db')


def PrintData(): 
    number_arr = []
    mixed_arr = []
    text_arr = []
    with connect:
        numbers = connect.execute("SELECT * FROM tbl_tall")   
        mixed = connect.execute("SELECT * FROM tbl_blandet")   
        text = connect.execute("SELECT * FROM tbl_tekst")
        for number_row in numbers:
            number_arr.append(number_row)
        for mixed_row in mixed:
            mixed_arr.append(mixed_row)
        for text_row in text:
            text_arr.append(text_row)

    print_pointer = 0
    #find longet array
    numbers_length = len(number_arr) - 1
    mixed_length = len(mixed_arr) -1 
    text_length = len(text_arr) -1
    biggest_arr = max(numbers_length,mixed_length,text_length)

    print("|----Numbers----|----Text----|----Mixed----|\n")
    while print_pointer < biggest_arr:
        if(print_pointer > numbers_length):
            print_number = "-/-"
        else:
            current_number = number_arr[print_pointer]
            print_number = current_number[1]

        if(print_pointer > mixed_length):
            print_mixed = "-/-"
        else:
            current_mixed = mixed_arr[print_pointer]
            print_mixed = current_mixed[1]
            
        if(print_pointer > text_length):
            print_text = "-/-"
        else:
            current_text = text_arr[print_pointer]
            print_text = current_text[1]

        print("    "+str(print_number)+"    "+str(print_text) + "    "+str(print_mixed))
        print_pointer += 1
            


if __name__ == '__main__':
    #auto start program
    PrintData()