#oppgave 33E
import datetime
import sqlite3 as testdb
today = datetime.date.today()
year = today.year
veteran_year = year - 30
connect = testdb.connect('uvUke33.db')

#id, produsent, modell, drivstoff, gearbox, km_stand, prod_year, regnr, skilttype, farge, sitteplasser

#get a list of all veteran vehicles
vehicles = []
with connect:
    sql = "SELECT * FROM tbl_bruktbiler WHERE prod_year <" + str(veteran_year)
    data = connect.execute(sql)
    for row in data: 
        vehicles.append(row)

print("Veteran Vehicles --------")
print(vehicles)
print("Veteran Vehicles --------")

#sort vehicles alphabetically
temp_array = []
for row in vehicles:
    current_vehicle_model = row[2]
    temp_array.append(current_vehicle_model)
#take names and sort them
temp_array.sort()

#iterate torugh all names in temp array and add them to another temp array, but now sorted
db_id = []
row_pointer = -1
for row in temp_array:
    #current row is alphabetically sorted
    row_pointer += 1
    pointer = -1
    for vehicle_row in vehicles:
        current_vehicle_model = vehicle_row[2]
        pointer += 1
        if(row == current_vehicle_model):
            #vehicle model number found
            db_id.append(pointer)
            #remove list from aphabetic list of vehicles
            temp_array.pop(row_pointer)


#iterate trough found array keys
final_sorted = []
iteration_pointer = 0
while iteration_pointer < len(db_id):
    #create final array with sorted names
    final_sorted.append(vehicles[db_id[iteration_pointer]])
    iteration_pointer += 1

#print final output
print(final_sorted)







