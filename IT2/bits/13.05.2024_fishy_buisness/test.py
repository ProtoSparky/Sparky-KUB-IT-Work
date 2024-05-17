import PySimpleGUI as sg
import random
import string



def word():
    return ''.join(random.choice(string.ascii_lowercase) for i in range(10))
def number(max_val=1000):
    return random.randint(0, max_val)

def make_table(num_rows, num_cols):
    data = [[j for j in range(num_cols)] for i in range(num_rows)]
    data[0] = [word() for _ in range(num_cols)]
    for i in range(1, num_rows):
        data[i] = [word(), *[number() for i in range(num_cols - 1)]]
    return data

# ------ Make the Table Data ------
data = make_table(num_rows=15, num_cols=6)
headings = [str(data[0][x]) for x in range(len(data[0]))]

sg.theme('DarkAmber')



tbl = [[sg.Table(values=data, headings=headings, max_col_width=25,
    auto_size_columns=True,
    display_row_numbers=True,
    justification='right',
    num_rows=20,
    key='-TABLE-',
    tooltip='This is a table')],
    [sg.Button('Read'), sg.Button('Double'), sg.Button('Change Colors')],
    [sg.Text('Read = read which rows are selected')],
    [sg.Text('Double = double the amount of data in the table')],
    [sg.Text('Change Colors = Changes the colors of rows 8 and 9')]
]



window = sg.Window("F-I-S-H", tbl, icon = ("./gui_assets/ico.ico"))




# Create an event loop
while True:
    event, values = window.read()
    # End program if user closes window or
    # presses the OK button
    if event == "Cancel" or event == sg.WIN_CLOSED:
        break
    if event == "Read":
        print(data)
        print(headings)

window.close()




'''
Data looks like this 
[
    [
        "zopfelzrhn",
        "ptmpuxtwmu",
        "eywzdggswc",
        "grlrpprhsl",
        "dsyaugaayx",
        "ksxrtzsqws"
    ],
    [
        "ygbaqbdhrs",
        899,
        839,
        215,
        475,
        637
    ],
    [
        "zvtsatzvbn",
        286,
        35,
        449,
        10,
        127
    ]
]


Headers look like this 
['dhihnqenuc', 'qiuwwjbrbt', 'dwxqpbblpb', 'xsiggfxirt', 'nfeulvlrtb', 'msjgugjvtm']




Sg table 
[[sg.Table(values=data[1:][:], headings=headings, max_col_width=25, background_color='lightblue',
                    auto_size_columns=True,
                    display_row_numbers=True,
                    justification='right',
                    num_rows=20,
                    alternating_row_color='lightyellow',
                    key='-TABLE-',
                    tooltip='This is a table')],
        [sg.Button('Read'), sg.Button('Double'), sg.Button('Change Colors')],
        [sg.Text('Read = read which rows are selected')],
        [sg.Text('Double = double the amount of data in the table')],
        [sg.Text('Change Colors = Changes the colors of rows 8 and 9')]]



'''