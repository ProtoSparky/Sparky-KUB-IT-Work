#Oppgave 33B
import sqlite3 as testdb
connect = testdb.connect('uvUke33.db')

print ("uvUke33, vis alle data.");

with connect:
    data = connect.execute("SELECT * FROM tbl_bruktbiler")
    for row in data:
        print(row);

