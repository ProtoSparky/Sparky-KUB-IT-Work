#Oppgave 33D
import sqlite3 as testdb
connect = testdb.connect('uvUke33.db')


def GetInput():
    LowestYear = input("Search for smallest year ")
    HighestYear = input("Enter highest year ")
    #require numeric numbers
    if(not LowestYear.isnumeric() and not HighestYear.isnumeric()):
          print("input must be number")
          GetInput()
    else:
         print("Searching for vehicles...")
         AskDB(HighestYear, LowestYear)


def AskDB(HighestYear, LowestYear):
     with connect:
            sql = "SELECT * FROM tbl_bruktbiler WHERE prod_year BETWEEN " + LowestYear + " AND " + HighestYear
            Vehicles = connect.execute(sql)
            row_counter = 0
            for row in Vehicles:
                print(row)
                row_counter += 1
            if(row_counter == 0):
                #display error message if no cars were found
                print("No cars found")

if __name__ == '__main__':
    #auto start program
    GetInput()