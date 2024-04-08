#oppgave 33A
import sqlite3 as testdb
connect = testdb.connect("uvUke33.db")
#produsent, modell, drivstoff, gearbox, km_stand, prod_year, regnr, skilttype, farge, sitteplasser
DataToAdd = ["Hyundai","Kona 2023", "Electric", "Automatic", 3, 2023, "ABC123", "varebil", "svart",95]
test = connect.cursor()

with connect:
    sql = """SELECT * from tbl_bruktbiler"""
    test.execute(sql)
    records = test.fetchall()


