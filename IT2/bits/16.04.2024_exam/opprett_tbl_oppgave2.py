
import sqlite3 as testdb
connect = testdb.connect('oppgave_2.db')

print ("\nuvUke33, Script oppretter tbl og setter data inn i tabell tbl_bruktbiler.\n");

with connect:
    connect.execute("""
    CREATE TABLE IF NOT EXISTS tbl_oppgave2 (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    kolonne1 TEXT(20),
	kolonne2 TEXT(20),
	kolonne3 TEXT(20)
    );
    """)

print ("Tabell opprettet, setter data innn.\n");

sql = 'INSERT INTO tbl_oppgave2 (id, kolonne1, kolonne2, kolonne3) values(?,?,?,?)'
data = [
	
	(1,"Mitsubishi", "kaffe", 2),
	(2,"Tokyo", "bil", 5),
	(3,"Gelendewagen",5, "hest"),
	(4,"Landrover","eple", 5),
	(5,"Diesel", "blue",5),
	(6, 7,"Tiguan","silver"),
	(7,"Volkswagen", "metallicblue", 5),
	(8, 9,"Range Rover","varebil"),
	(9,"Citroen", "varebil",3),
	(10,"elektrisk", "hvit", 5.6),
	(11,"4,7", "Berlingo","personbil"),
	(12,"Sverige","Discovery",5.4),
	(13, "Mercedes", "3,6" ,"personbil"),
	(14,"Volkswagen","Kattegatt","black"),
	(15, "2CV","Bensin","veteranbil"),
	(16, "Europa","EU","Polen"),
	(17,"Oslo","by",5),
	(18,"Donald And","Andeby","Disney"),
	(19,"Beach Buggy","yellow",2),
	(20,"fly","turist","ferie"),
	(21,"AC12356","varebil","grey"),
	(22,"sommer",2,"ferietid"),
	(23,"red",4.8,"tid"),
	(24,"bord", "stol", 5.2),
	(25,"skoledag","hverdag","kaffe") 
]

with connect:
    connect.executemany(sql, data)
    
print ("\nData lagt inn i tabell,\n\nScript ferdig.\n");  	
    
