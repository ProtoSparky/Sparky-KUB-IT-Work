import sqlite3 as testdb
import re
connect = testdb.connect('oppgave_2.db')
tbl_oppgave2 = []
total_numbers = []
total = 0


def read_tbl_tbl_oppgave2():
    with connect:
        data = connect.execute("SELECT * FROM tbl_oppgave2")
        for row in data:
            templist = [row[1],row[2], row[3]]
            tbl_oppgave2.append(templist)


def filter_data():
    for row in tbl_oppgave2:
        for row_list in row: 
            #check requirements
            if(filter_data3(row_list) != False):
                total_numbers.append(filter_data3(row_list))
                

def filter_data3(input):
    try:
        out = float(input)
        return out
    except:
        x = re.sub("[,]", ".", input)
        #replaces comma with dot
        try:
            out = float(x)
            return out
        except:
            return False


def sum_numbers(total):
    for number in total_numbers:
        total = float(number) + float(total)
    print("The total number is ")
    print(total)

def run(): 
    read_tbl_tbl_oppgave2()
    filter_data()
    sum_numbers(total)




if __name__ == '__main__':
    #auto start program
    run()