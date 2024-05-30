poengsum = input("Skriv poengsummen din: ")
try: #Her sjekker vi om input er et faktisk tall slik at vi kan gjøre "beregninger"
    poengsum = int(poengsum)
    if(poengsum >= 0 and poengsum < 50):
        print("Ikke bestått")
    elif(poengsum >= 50 and poengsum <= 69):
        print("Bestått")
    elif(poengsum >= 70 and poengsum <= 89):
        print("Godt bestått")
    elif(poengsum >= 90 and poengsum <= 100):
        print("meget godt bestått")
    else:
        print("Ikke gyldig poengsun")
except:
    print("Poengsum er ikke et tall!")