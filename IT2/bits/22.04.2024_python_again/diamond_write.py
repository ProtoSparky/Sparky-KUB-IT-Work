import pandas
import csv
file_path = "./05.csv"
file_array = pandas.read_csv(file_path,delimiter=",")
collumns = file_array.columns.values.tolist()
collumn_length = len(collumns)
collumn_length_half = collumn_length/2 

#write to CSV
def write_to_csv(array, filename):
    with open(filename, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        
        # Add header if array has more than one element
        if len(array) > 1:
            header = ['key']
            for row in array[0]:
                header.append(row[0])
            writer.writerow(header)

        for row in array:
            writer.writerow([row[0]] + [value if value else 'null' for value in row[1:]])

temp_storage  = {}

collumn_iterate = 0
while collumn_iterate < collumn_length:
    current_collun_name = collumns[collumn_iterate]
    lines = file_array[current_collun_name]
    total_lines = len(lines)    
    #iterate trough lines
    line_iterate = 0
    print("writing collumn" + current_collun_name)
    while line_iterate < total_lines:
        current_data = file_array[current_collun_name][line_iterate]       

        #iterate trough new collumns
        new_collumn_pointer = 0
        while new_collumn_pointer < collumn_length:
            #temp_storage[current_collun_name][line_iterate+1] = current_data
            temp_storage.setdefault(current_collun_name, {}).setdefault(line_iterate+1, current_data)
            new_collumn_pointer += 1



        #write data
        line_iterate += 1

    collumn_iterate += 1
write_to_csv(temp_storage, "wow.csv")





    



