import pandas
import csv
import json
''''
file_path = "./05.csv"
file_array = pandas.read_csv(file_path,delimiter=",")
'''



##################################################################################################
import pandas as pd

def create_zigzag_csv(file_path, output_path):
    # Step 1: Read the CSV file
    df = pd.read_csv(file_path, delimiter=",")
    
    # Step 2: Determine the zigzag pattern
    num_rows = df.shape[1] # Number of columns in the original DataFrame
    num_cols = df.shape[0] # Number of rows in the original DataFrame
    
    # Step 3: Create the zigzag DataFrame
    zigzag_df = pd.DataFrame(index=range(num_rows), columns=range(num_cols))
    for col in range(num_cols):
        for row in range(num_rows):
            if (row + col) % 2 == 0: # Zigzag pattern
                zigzag_df.iloc[row, col] = df.iloc[col, row]
            else:
                zigzag_df.iloc[row, col] = 'null'
    
    # Step 4: Write the zigzag DataFrame to a new CSV file
    zigzag_df.to_csv(output_path, sep=';', index=False, header=False)


############################################################################
create_zigzag_csv("./05.csv", "./wtf.csv")






    



