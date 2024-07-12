#oppgave 33A
import sqlite3 as testdb
connect = testdb.connect("uvUke33.db")
#produsent, modell, drivstoff, gearbox, km_stand, prod_year, regnr, skilttype, farge, sitteplasser
DataToAdd = ["Hyundai","Kona 2023", "Electric", "Automatic", 3, 2023, "ABC123", "varebil", "svart",95]
test = connect.cursor()
with connect:
    insert_sql = """INSERT INTO tbl_bruktbiler (produsent, modell, drivstoff, gearbox, km_stand, prod_year, regnr, skilttype, farge, sitteplasser) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
    test.execute(insert_sql,(DataToAdd[0], DataToAdd[1], DataToAdd[2],DataToAdd[3],DataToAdd[4],DataToAdd[5],DataToAdd[6],DataToAdd[7],DataToAdd[8], DataToAdd[9]))
    test.close()



