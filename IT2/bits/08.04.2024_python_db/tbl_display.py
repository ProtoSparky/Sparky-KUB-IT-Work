#Oppg. 33C. Show sector diagram 
import sqlite3 as testdb
from matplotlib import pyplot as plt
import numpy as np
connect = testdb.connect('uvUke33.db')

print ("uvUke33, vis alle data.")

with connect:
    #fetch data for different vehicle fuel types
    Diesel = connect.execute("SELECT * FROM tbl_bruktbiler WHERE drivstoff = 'Diesel'")
    Gasoline = connect.execute("SELECT * FROM tbl_bruktbiler WHERE drivstoff = 'Bensin'")
    Electric = connect.execute("SELECT * FROM tbl_bruktbiler WHERE drivstoff = 'Electric'")
    FuelType = ["Diesel", "Bensin", "Electric"]
    #prepare empty arrays to shove the data into
    DieselAmount = []
    GasolineAmount = []
    ElectricAmount = []

    #write data for each fuel type to our empty arrays
    for row in Diesel:
        DieselAmount.append(row)
    
    for row in Gasoline:
        GasolineAmount.append(row)
    
    for row in Electric:
        ElectricAmount.append(row)

    #generate array pyplot can read
    FuelTypeAmount = [len(DieselAmount),len(GasolineAmount),len(ElectricAmount)]

    #create plot
    connect.close()
    fig = plt.figure(figsize=(10, 7))
    plt.pie(FuelTypeAmount, labels=FuelType)
    plt.show()
    




        