
import sqlite3 as testdb
connect = testdb.connect('oppgave_1.db')

print ("\Prove 16 april 2024, Script oppretter tbl og setter data inn i tabeller til oppgave 1.\n");

with connect:
    connect.execute("""
    CREATE TABLE IF NOT EXISTS tbl_oppgave1A (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    land TEXT(20),
	hovedstad TEXT(20)
    );
    """)

print ("Tabell tbl_oppgave1A opprettet, setter data innn.\n");


sql = 'INSERT INTO tbl_oppgave1A (id, land, hovedstad) values(?,?,?)'
data = [
	
	(1,"Norge", "Oslo"),
	(2,"Spania","Madrid"),
	(3,"Sverige", "Stockholm"),
	(4,"Slovakia", "Bratislava" ),
	(5,"Syria","Damaskus"),
	(6,"Taiwan","Taipei"),
	(7,"Syria","Damaskus"),
	(8,"Peru","Lima"),
	(9,"Tyskland","Berlin"),
	(10,"Polen","Warszawa"),
	(11,"Japan","Tokyo"),
	(12,"Russland","Moskva"),
	(13,"Finland","Helsingfors"),
	(14,"Estland","Tallin"),
	(15,"Egypt","Kairo"),
	(16,"Danmark", "København"),
	(17,"Frankrike","Paris"),
	(18,"Island","Reykjavík"),
	(19,"Italia","Roma"),
	(20,"Kroatia","Zagrep")		 
]

with connect:
    connect.executemany(sql, data)
	
with connect:
    connect.execute("""
    CREATE TABLE IF NOT EXISTS tbl_oppgave1B (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    land TEXT(20),
	hovedstad TEXT(20)
    );
    """)

print ("Tabell tbl_oppgave1B opprettet, setter data innn.\n");	

sql = 'INSERT INTO tbl_oppgave1B (id, land, hovedstad) values(?,?,?)'
data = [
	
	(1,"Norge", "Oslo"),
	(2,"Irland","Dublin"),
	(3,"Sverige", "Stockholm"),
	(4,"Nepal", "Katmandu" ),
	(5,"Oman","Muskat"),
	(6,"Portugal","Lisboa"),
	(7,"Cuba","Havana"),
	(8,"CAnada","Ottawa"),
	(9,"Bulgaria","Sofia"),
	(10,"Albania","Tirana"),
	(11,"Algerie","Alger"),
	(12,"Australia","Canberra"),
	(13,"Finland","Helsingfors"),
	(14,"Bahamas","Nassau"),
	(15,"Ghana","Accra"),
	(16,"Danmark", "København"),
	(17,"Jordan","Amman"),
	(18,"Island","Reykjavík"),
	(19,"Italia","Milano"),
	(20,"USA","Washington DC")		 
]

with connect:
    connect.executemany(sql, data)
    
print ("\nData lagt inn i tabell,\n\nScript ferdig.\n");  	
    
