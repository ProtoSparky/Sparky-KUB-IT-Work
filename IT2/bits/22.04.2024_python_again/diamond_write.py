import pandas
import csv
import json
file_path = "./05.csv"
file_array = pandas.read_csv(file_path,delimiter=",")



##################################################################################################
def get_zigzag(df, headers):
    # Calculate the number of rows needed for each header
    num_rows = df.shape[0] // len(headers) + 1
    # Initialize an empty list to store the zigzag data
    zigzag_data = []

    # Loop through each row in the dataframe
    for i in range(num_rows):
        # Add a new row to the zigzag data
        zigzag_row = []
        
        # Loop through each header in the headers list
        for j, header in enumerate(headers):
            # Calculate the column index based on the current row and header index
            col_index = (i + j) % len(headers)
            
            # If the column index is within the bounds of the dataframe
            if col_index < df.shape[1]:
                # Add the data from the dataframe to the zigzag row
                zigzag_row.append(df.iloc[i, col_index])
            else:
                # Add a null value to the zigzag row
                zigzag_row.append(np.nan)
        
        # Add the zigzag row to the zigzag data list
        zigzag_data.append(zigzag_row)

    return pandas.DataFrame(zigzag_data, columns=headers)
############################################################################
get_zigzag(file_array,)






    



