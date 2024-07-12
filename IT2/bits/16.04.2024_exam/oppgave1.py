import sqlite3 as testdb
connect = testdb.connect('oppgave_1.db')

tbl_oppgave1A = []
tbl_oppgave1B = []
saved = []



def read_tbl_oppgave1A():
    with connect:
        data = connect.execute("SELECT * FROM tbl_oppgave1A")
        for row in data:
            tbl_oppgave1A.append(row)

def read_tbl_oppgave1B():
    with connect:
        data = connect.execute("SELECT * FROM tbl_oppgave1B")
        for row in data:
            tbl_oppgave1B.append(row)


def check_arrays():
    print("checking arrays")
    parent_arr_length = len(tbl_oppgave1A)
    parent_pointer = 0
    while parent_pointer < parent_arr_length:
        #check arrays
        parent = tbl_oppgave1A[parent_pointer]
        child = tbl_oppgave1B[parent_pointer]
        if(parent[1] == child[1] and parent[2] == child[2]):
            #match
            print("match found!")
            saved.append(parent)
        parent_pointer += 1

def print_nicely():
    print("-----------------Found matches-----------")
    print("|-------Country------| |------City------|")
    for row in saved:
        print("|       " + row[1] + "      |      " + row[2] + "    |")


def run():
    read_tbl_oppgave1A()
    read_tbl_oppgave1B()
    check_arrays()
    print_nicely()


if __name__ == '__main__':
    #auto start program
    run()