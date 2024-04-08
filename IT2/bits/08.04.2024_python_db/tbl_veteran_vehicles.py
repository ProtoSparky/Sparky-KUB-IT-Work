#oppgave 33E
import datetime
import sqlite3 as testdb
today = datetime.date.today()
year = today.year
connect = testdb.connect('uvUke33.db')
