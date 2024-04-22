import pandas
#import dependency file
file_path = "./05.csv"
file_array = pandas.read_csv(file_path,delimiter=",")
print(file_array)