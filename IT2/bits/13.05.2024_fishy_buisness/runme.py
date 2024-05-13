data_loc = "./DATA/data.csv"
import tools

'''
DATA to be saved 


• Dato for fangst.  
• Tidspunkt for fangst.  
• Hvor fisken ble fanget.  
• Art (hvilken slags fisk det er).  
• Lengde på fisken.  
• Vekt på fisken.  
• Redskap (Kan du avgrense det til: meitefiske, flue, spinner,  blink, garn, isfiske, dorge).  



TODO 

• Lagre data om hver fangst i filen/database.  
• Kunne redigere innhold i filen/database.  
• Lagre redigert innhold etter oppdatering.  
• Utskrift av alt innhold i filen/database i en strukturert tabell.  
• Vise antall fisk av hver art i søylediagram  
• Vise prosentvis mengde fisk i kilo av hver art i et sektordiagram.  
• Vise fangst fordelt på måneder. Velg her selv grafisk presentasjon. 
• Brukergrensesnitt må være intuitivt og delikat (pent å se på) 

'''

def setup():
    print("Setting up stuff")

    setup_data() #setup data if it wanst there from the beginning

    AddFish()



def setup_data():

    if(tools.read_csv(data_loc) == None):
        #creae file as it does not exist
        data = {"Date":[], "Time":[], "Location":[], "Species":[], "Fish_length":[], "Fish_weight":[], "Capture_tool":[]}
        tools.write_csv(data_loc, data)
    


def AddFish(Day=None,Month=None,Year=None,Time=None,Location=None,Species=None,Fish_length=None,Fish_weight=None,Capture_tool=None):
    #check if input vars are nonexistent
    if(Day == None and Month == None and Year == None and Time == None and Location == None and Species == None and Fish_length == None and Fish_weight == None and Capture_tool == None):
        #vars undefined, using Text UI
        print("vars not defined, launching text ui")

        Day = tools.Ask(question = "Which day was the fish caught (0-30)? : ", type = "num")
        Month = tools.Ask(question = "Which month was the fish caught (1-12)? : ", type = "num")
        Year = tools.Ask(question = "Which year was the fish caught? : ", type = "num")
        Time = tools.Ask(question = "On which time was the fish caught? : ", type = "num_and_str_special")
        Location = tools.Ask(question = "Where was the fish caught? : ", type = "str")
        Species = tools.Ask(question = "Which specie is this fish? : ", type = "str")
        Fish_length = tools.Ask(question = "---------\nHow long is the fish (cm)\ndont include cm \n: ", type = "dec")
        Allowed_capture_tools = ["meitefiske", "flue", "spinner",  "blink", "garn", "isfiske", "dorge"]
        Capture_tool = tools.Ask(question = "---------\nWhat tool was used to capture \nAllowed tools " + str(Allowed_capture_tools) + "\n: ", type = "str_allowed", allowed_strings= Allowed_capture_tools)       
            
    else:
        print("vars drfined, adding fish to text file")



    #write data to DB
    
    ##get current data
    file = pd.read_csv(data_loc, delimiter=";")

    ###i know that this permanent implementation is not ideal
    file["Date"].append(str(Day) + "." + str(Month) + "."+ str(Year))
    file[Time].append(str(Time))
    file["Location"].append(Location)
    file["Species"].append(Species)
    file["Fish_length"].append(Fish_length)
    file["Fish_weight"].append(Fish_weight)
    file["Capture_tool"].append(Capture_tool)

    ##write to db

    print(file)







setup()