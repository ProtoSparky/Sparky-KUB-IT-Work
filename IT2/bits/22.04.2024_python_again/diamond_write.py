import pandas
import csv
import json
file_path = "./05.csv"
file_array = pandas.read_csv(file_path,delimiter=",")



##################################################################################################

def zigzag_csv(file_array, output_file):
    # Read the input CSV file into a pandas dataframe
    df = file_array

    # Get the number of columns (headers)
    num_cols = len(df.columns)

    # Initialize an empty list to store the zigzag data
    zigzag_data = []

    # Iterate over each row in the dataframe
    for i, row in enumerate(df.iterrows()):
        # For each column, create a zigzag pattern with nulls
        zigzag_row = []
        for j, val in enumerate(row[1]):
            if (i + j) % 2 == 0:  # even index
                zigzag_row.append(str(val))
            else:
                zigzag_row.append('null')
        zigzag_data.append(zigzag_row)

    # Create a new dataframe with the zigzag data
    zigzag_df = pandas.DataFrame(zigzag_data, columns=df.columns)

    # Write the zigzag dataframe to the output CSV file
    zigzag_df.to_csv(output_file, index=False)
############################################################################
zigzag_csv(file_array,"WTF.csv")






    



