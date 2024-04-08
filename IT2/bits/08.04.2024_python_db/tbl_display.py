#Oppg. 33C. Show sector diagram 
import sqlite3 as testdb
connect = testdb.connect('uvUke33.db')

print ("uvUke33, vis alle data.")

with connect:
    data = connect.execute("SELECT * FROM tbl_bruktbiler")
    records = data.fetchall()
    record_len = len(records)




        