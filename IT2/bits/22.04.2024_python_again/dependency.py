import pandas as pd

#this function reads a csv file from a file path, and returns said array
def read_csv_to_array(file_path,delimiter):
    # Read the CSV file
    df = pd.read_csv(file_path,delimiter = delimiter)
    # Convert the DataFrame to a numpy array
    array = []
    array.append(df)
    return array
##########################################################################
