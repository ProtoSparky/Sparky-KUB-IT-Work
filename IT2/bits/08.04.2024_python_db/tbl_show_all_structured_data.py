import sqlite3 as testdb
connect = testdb.connect("uvUke33.db")
print("Eksempel 33_07, Vis alle strukturert er startet")

test = connect.cursor()

with connect:
    sql = """SELECT * from tbl_bruktbiler"""
    test.execute(sql,)
    records = test.fetchall()
    print("antall rater (rows) er: ", len(records))
    print("skriver ut hver rad for seg \n")
    for row in records:
        print("id", row[0])
        print(row[1])
    test.close()
print("script er ferdig")