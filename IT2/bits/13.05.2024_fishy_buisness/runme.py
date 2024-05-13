data_loc = "./DATA/data.csv"
import pandas as pd
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
    try: 
        file = pd.read_csv(data_loc, delimiter=";")
    except:
        #create new file
        file = pd.DataFrame({
            "Date":[], "Time":[], "Location":[], "Species":[], "Fish_length":[], "Fish_weight":[], "Capture_tool":[]
        })
        file.to_csv(data_loc, index=False)


def AddFish(Day=None,Month=None,Year=None,Time=None,Location=None,Species=None,Fish_length=None,Fish_weight=None,Capture_tool=None):
    #check if input vars are nonexistent
    if(Day == None and Month == None and Year == None and Time == None and Location == None and Species == None and Fish_length == None and Fish_weight == None and Capture_tool == None):
        #vars undefined, using Text UI
        print("vars not defined, launching text ui")


        Day = input("Which day (0-30) was the fish caught? : ")
        if(tools.is_num(Day)):
            




    else:
        print("vars drfined, adding fish to text file")





setup()