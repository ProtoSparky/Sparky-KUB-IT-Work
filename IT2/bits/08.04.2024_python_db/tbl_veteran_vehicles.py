#oppgave 33E
import datetime
import sqlite3 as testdb
today = datetime.date.today()
year = today.year
veteran_year = year - 30
connect = testdb.connect('uvUke33.db')

#produsent, modell, drivstoff, gearbox, km_stand, prod_year, regnr, skilttype, farge, sitteplasser

#get a list of all veteran vehicles
vehicles = []
with connect:
    sql = "SELECT * FROM tbl_bruktbiler WHERE prod_year <" + str(veteran_year)
    data = connect.execute(sql)
    for row in data: 
        vehicles.append(row)

#sort vehicles alphabetically
