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

#sort vehicles alphabetically
temp_array = []
for row in vehicles:
    current_vehicle_model = row[2]
    temp_array.append(current_vehicle_model)
#take names and sort them
temp_array.sort()

#iterate trough all names in temp array and add them to another temp array, but now sorted
db_id = []
pointer = -1
for vehicle_row in vehicles:
    current_vehicle_model = vehicle_row[2]
    pointer += 1
    pointer_row = 0
    for row in temp_array:
        if(row == current_vehicle_model):
            db_id.append(pointer)
            temp_array.pop(pointer_row)
        pointer_row += 1

#iterate trough found array keys
final_sorted = []
iteration_pointer = 0
while iteration_pointer < len(db_id):
    #create final array with sorted names
    final_sorted.append(vehicles[db_id[iteration_pointer]])
    iteration_pointer += 1

#print final output
print_pointer = 0
while print_pointer < len(final_sorted):
    if(print_pointer == 0):
        print("|-------------------------------------------------List of veteran vehicles----------------------------------------------------| \n")
        print("|   produsent  |  modell |  drivstoff |  gearbox  |  km_stand  |  prod_year  |  regnr |  skilttype  |  farge  |  sitteplasser\n")
    current_row = final_sorted[print_pointer]
    print_pointer += 1
    print(" | ", current_row[1] , " | ", current_row[2], " | ", current_row[3], " | " , current_row[4], " | ", current_row[5]," | ",current_row[6], " | ", current_row[7]," | ", current_row[8], " | ", current_row[9], " | ", current_row[10])