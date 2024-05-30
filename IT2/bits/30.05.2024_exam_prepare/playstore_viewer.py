import tools as tk
#Lag et program som presenterer en oversikt over de tre største kategoriene målt i antall apper.
#Oversikten skal vise antallet apper, gjennomsnittsratingen og det gjennomsnittlige antallet 
#installasjoner for hver av disse tre kategoriene.
csv_file = tk.read_csv("googleplaystore.csv", delimiter = ",")
csv_file_keys = csv_file.keys() #This is how we get the keys in an array in python
print(csv_file_keys)
