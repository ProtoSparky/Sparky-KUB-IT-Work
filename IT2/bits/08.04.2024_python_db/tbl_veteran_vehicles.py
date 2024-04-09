#oppgave 33E
import datetime
import sqlite3 as testdb
today = datetime.date.today()
year = today.year
veteran_year = year - 30
connect = testdb.connect('uvUke33.db')
print(veteran_year)