import sqlite3 as testdb
connect = testdb.connect('uvUke33.db')

print ("\nuvUke33, Script oppretter tbl og setter data inn i tabell tbl_bruktbiler.\n");

with connect:
    connect.execute("""
    CREATE TABLE IF NOT EXISTS tbl_bruktbiler (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    produsent TEXT(20),
	modell TEXT(20),
	drivstoff TEXT(12),
	gearbox TEXT (20),
    km_stand INTEGER(8),
    prod_year INTEGER(4),
    regnr TEXT(12),
    skilttype TEXT(12),
    farge TEXT(12),
	sitteplasser INTEGER(2)
    );
    """)

print ("Tabell opprettet, setter data innn.\n");

sql = 'INSERT INTO tbl_bruktbiler (id, produsent, modell, drivstoff, gearbox, km_stand, prod_year, regnr, skilttype, farge, sitteplasser) values(?,?,?,?,?,?,?,?,?,?,?)'
data = [
	
	(1,"Mitsubishi", "L200", "Diesel" ,"manuel", 207000, 2007, "AA12345" , "varebil" , "blue", 2),
	(2,"Mitsubishi", "Pajero", "Diesel","automat",140000, 2018, "AA12344", "personbil", "red", 5),
	(3,"Mercedes","Gelendewagen", "Diesel","manual",98000, 2020, "AA12343","personbil", "blue", 5),
	(4,"Landrover","Defender", "Diesel","automat",2000, 2023, "AA12342","personbil", "grey", 5),
	(5,"Landrover", "Range Rover", "Diesel","manual", 223000, 2014, "AA12341","personbil", "blue",5),
	(6,"Volkswagen","Tiguan","Diesel","automat", 309000, 2009, "AZ12389","personbil","silver", 5),
	(7,"Volkswagen","Tiguan", "Bensin","automat",122644,2012, "AZ12388","personbil", "metallicblue", 5),
	(8,"Landrover", "Range Rover","Diesel","manual",147000,2006, "AZ12387","varebil","black",2),
	(9,"Citroen", "Berlingo", "Diesel", "manual", 192000, 2010, "AX12345", "varebil", "red", 3),
	(10,"Volkswagen","ID.4", "elektrisk","automat",150000,2021, "AZ12386","personbil", "hvit",5),
	(11,"Citroen", "Berlingo", "Bensin","manual",214000, 2001, "AX12389","personbil", "red",5),
	(12,"Landrover","Discovery","Diesel","automat",115000, 2015, "AC12345","personbil","hvit",5),
	(13, "Mercedes","GLK 2020 CDI", "Diesel","automat",257000, 2010, "AC12346","personbil","black", 5),
	(14,"Volkswagen","ID.4","elektrisk","automat",23, 2023, "AC12344","personbil","black",5),
	(15, "Citroen","2CV","Bensin","manual",174000, 1982, "AX12367","veteranbil", "red",4),
	(16, "Citroen","BN11","Bensin","manual", 3000, 1938, "AX12346", "veteranbil","black",4),
	(17,"Mercedes","GLE350DE","Diesel","automat",13773, 2022, "AC12343","personbil","grey",5),
	(18,"Mitsubishi","Outlander","Diesel","automat",38850, 2019, "AV12365","personbil","red",5),
	(19,"Volkswagen","Beach Buggy","Bensin","manual", 58500, 1967,"AC12342","veteranbil","yellow",2),
	(20,"Citroen","2CV","Bensin", "manual",18000, 1973,"AC12347","veteranbil","black",4),
	(21,"Mercedes","Vito","Diesel","automat",212800, 2012,"AC12356","varebil","grey",3),
	(22,"Mitsubishi","Eclipse","Bensin","manual",109850, 1990,"AX12456","personbil", "black",2),
	(23,"Volkswagen","type 3", "Bensin","manual", 47000, 1961, "AC12355", "veteranbil","red",4),
	(24,"Mercedes","Vito","Diesel", "manual", 1500, 2022, "AC12348","varebil", "hvit", 3),
	(25,"Mercedes","Gelendewagen", "bensin","manual", 192000, 2010, "AC12357","varebil","hvit",2) 
]

with connect:
    connect.executemany(sql, data)
    
print ("\nData lagt inn i tabell,\n\nScript ferdig.\n");  	
    