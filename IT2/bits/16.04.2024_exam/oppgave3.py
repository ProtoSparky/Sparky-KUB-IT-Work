import sqlite3 as testdb
import re
connect = testdb.connect('oppgave_3.db')
user_inputs = []
def ask4input():
    user_data = input("Enter Input ")
    user_inputs.append(user_data)
    askagain()

def askagain():
    if(len(user_inputs) > 0): 
        #ask to ask for more inputs
        user_data = input("Enter more inputs? (y/n)")
        if(user_data == "y"):
            #ask for more inputs
            user_data = input("Enter Input ")
            user_inputs.append(user_data)
            askagain()
        elif(user_data == "n"):
            #stop asking for more inputs
            process_data()
        else:
            print("input wrong Try again!")
            ask4input()



def process_data(): 
    #iterate trough array
    for row in user_inputs:
        #look for text
        if(re.findall("\D", row)):
            #text does not contain digits            
            if(not re.findall("[0-9]", row)):
                write_to_tbl_tekst(row)
            else: 
                #text that contains mixed stuff
                write_to_tbl_blandet(row)

        elif(re.findall("[0-9]", row)):
            #text that does not contain any words
            write_to_tbl_tall(row)
        else:
            #text that contains mixed stuff
            write_to_tbl_blandet(row)
        
    PrintData()


def write_to_tbl_tekst(input):
    connect = testdb.connect('oppgave_3.db')
    with connect: 
        sql = 'INSERT INTO tbl_tekst (kolonne1) values(?)'
        data = [input]
        connect.execute(sql,data)

def write_to_tbl_tall(input):
    connect = testdb.connect('oppgave_3.db')
    with connect: 
        sql = 'INSERT INTO tbl_tall (kolonne1) values(?)'
        data = [input]
        connect.execute(sql,data)

def write_to_tbl_blandet(input):
    connect = testdb.connect('oppgave_3.db')
    with connect: 
        sql = 'INSERT INTO tbl_blandet (kolonne1) values(?)'
        data = [input]
        connect.execute(sql,data)






def setup_databases():
    with connect: 
        #table text
        connect.execute("""
        CREATE TABLE IF NOT EXISTS tbl_tekst (
        id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        kolonne1 TEXT(20)
        );
        """)
        
        #table tbl_tall 
        connect.execute("""
            CREATE TABLE IF NOT EXISTS tbl_tall (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            kolonne1 TEXT(20)
            );
            """)
        
        #table tbl_blandet
        connect.execute("""
            CREATE TABLE IF NOT EXISTS tbl_blandet (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            kolonne1 TEXT(20)
            );
            """)

        
def PrintData(): 
    connect = testdb.connect('oppgave_3.db')
    with connect:
        numbers = connect.execute("SELECT * FROM tbl_tall")   
        mixed = connect.execute("SELECT * FROM tbl_blandet")   
        text = connect.execute("SELECT * FROM tbl_tekst")   


        print("-----Numbers-----")
        for number_row in numbers:            
            print(number_row[1])
        
        print("-----Letters-----")
        for text_row in text:
            print(text_row[1])

        print("-----Mixed-----")
        for mixed_row in mixed:
            print(mixed_row[1])
        print("---------------")


def run():
    setup_databases()
    ask4input()


if __name__ == '__main__':
    #auto start program
    run()