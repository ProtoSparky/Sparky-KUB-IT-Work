import random
import numpy as np
from matplotlib import pyplot as plt

sim_length=1000
loop_op= 0
array=[]


fig = plt.figure(figsize =(10, 5))
while loop_op <= sim_length:
    die1=random.randint(1,6)
    die2=random.randint(1,6)
    die_total=die1+die2
    loop_op += 1
    array +=[die_total]


    
print(array)
plt.hist(array, bins = [2,3,4,5,6,7,8,9,10,11,12])
    







 
plt.title("Terningkast")
 

plt.show()


