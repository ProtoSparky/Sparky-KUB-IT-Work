def kalorier():    
    hastighet = input("Skriv inn hastighet: ");   
    hastighet = float(hastighet.replace(",","."));        
    if hastighet >60 or hastighet <=0:        
        print("Din hastighet er ikke sannsynlig")        
        input("Press enter for ny start")    
        kalorier()     
        

if __name__ == '__main__':
        kalorier()