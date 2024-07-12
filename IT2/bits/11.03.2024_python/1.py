import datetime

def numbers():    
    Input = input("Input an 8 digit number: ")   
    if(not Input.isnumeric()):
          print("input must be number")
          numbers()
    elif(len(Input) == 8):
            first_number = int(Input[0:2])
            next_numbers = int(Input[2:4])
            last_numbers = int(Input[4:8])
            if(first_number > 0 and first_number <32):
                    if(next_numbers > 0 and next_numbers <13):
                        current_date = datetime.datetime.now()
                        current_year = int(current_date.year)
                        if(last_numbers > 1890 and last_numbers < current_year):
                              print("The number " + str(Input) +" is correct")
                              numbers() 
                        else:
                              print("the last 4 digits are not between 1890 and current year")  
                              numbers()                            
                    else:
                        print("Second number is not bigger than 0 and maller than 13")
                        numbers()
            else:
                  print("First number smaller is not bigger than 0 and smaller than 32")
                  numbers()
    else:
        print("input wrong")
        numbers()


if __name__ == '__main__':
    numbers()

##Yandere dev code