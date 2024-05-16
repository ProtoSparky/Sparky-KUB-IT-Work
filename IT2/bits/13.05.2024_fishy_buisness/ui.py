import PySimpleGUI as sg
sg.theme('DarkAmber')


home_option = [
    [sg.Text("This is a fishy program")],
    [sg.Text("Click the tabs above to view the fishy fish options")]
]
edit_db_option = [
    [sg.Text("Edit database")]
]
display_fish_option = [
    [sg.Text("This is where displayed fishy fishyness will be displayed")]
]
species_pr_harvested_kg_option = [
    [sg.Text("This is where it'll display harvested fish pr species")]
]


body =  [
    [sg.TabGroup([[
        sg.Tab('Home',home_option),
        sg.Tab ('Edit "Database"', edit_db_option),
        sg.Tab ('Fish species', display_fish_option),
        sg.Tab ('Harvested fish', species_pr_harvested_kg_option),
        
    ]])],
    [sg.Button('Cancel')]
]






window = sg.Window("F-I-S-H", body)

# Create an event loop
while True:
    event, values = window.read()
    # End program if user closes window or
    # presses the OK button
    if event == "OK" or event == sg.WIN_CLOSED:
        break

window.close()