import random
import numpy as np
from matplotlib import pyplot as plt

sim_length=1000
loop_op= 1
array=[0]


fig = plt.figure(figsize =(10, 7))
while loop_op < sim_length:
    die1=random.randint(1,6)
    die2=random.randint(1,6)
    die_total=die1+die2
    ##print(die_total)
    #array.insert(loop_op,die_total)
    loop_op += 1


        # Creating plot
    
    plt.hist(die_total, bins = [0, 10, 20, 30,
                        40, 50, 60, 70,
                        80, 90, 100])
    






# Creating dataset
#a = np.random.randint(100, size =(50))
 
# Creating plot
#fig = plt.figure(figsize =(10, 7))
 
#plt.hist(a, bins = [0, 10, 20, 30,
#                    40, 50, 60, 70,
#                    80, 90, 100])
 
plt.title("Numpy Histogram")
 

plt.show()


