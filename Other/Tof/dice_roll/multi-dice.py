import random
import numpy as np
from matplotlib import pyplot as plt
###############################################################

sim_length=1000             #Amount of dice rolls
dice_amount = 10            #Amount of dices
Dx = 6                      #Amount of sides each dice has
print_output = 0            #Print output as array in terminal. 1 = on. 0= off
verbose_output = 0          #Verbose text progressbar. It's nice to have this on if youre simulating many many many many dice.  1=on.  0=off 

###############################################################

loop_op= 0
array=[]
fig = plt.figure(figsize =(10, 5))

def die_roller(die_amount):
    current_die = 1
    die_array=[]
    while current_die <= die_amount:        
        die = random.randint(1,Dx)
        current_die +=1 
        die_array +=[die]
      
    sum = 0        
    #Loop through the array to calculate sum of elements    
    for i in range(0, len(die_array)):    
        sum = sum + die_array[i]
    return sum


while loop_op <= sim_length:
    loop_op += 1
    array +=[die_roller(dice_amount)]

    ##Debug
    if verbose_output == 1:
        print("rolling dice " + str(loop_op) + "/" + str(sim_length))
    ##Debug

histogram_size= dice_amount-1
hist_array=[]
while histogram_size < Dx * dice_amount:
    histogram_size += 1
    hist_array +=[histogram_size]

    
if print_output == 1:
    print("||||||||||||||")
    print(array)
    print("||||||||||||||")


plt.hist(array, hist_array) 
plt.title(str(dice_amount)+" terninger " + str(Dx)+ " sider. Simulasjon mengde " + str(sim_length))
plt.show()