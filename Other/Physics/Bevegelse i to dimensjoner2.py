import matplotlib.pyplot as pplot
from math import *
from numpy import * 

antall_punkter = 100
t = linspace(0, 1, antall_punkter) # 0 er starttidspunkt, 10 er sluttidspunkt målt i sekunder. Antall punkter forteller oss hvor mange datapunkter vi lagrer imellom dette. 
x = [] # Liste med x-verdier
y = [] # Liste med y-verdier

distanse = []

g = -9.81 # m/s^2
v_0 = 4.91  # Startfart m/s
utskytingsvinkel = 35
starthøyde = 1.50 # m

# Utregninger 
utskytingsvinkel = deg2rad(utskytingsvinkel) # grader
vx_0 = v_0*cos(utskytingsvinkel) 
vy_0 = v_0*sin(utskytingsvinkel)



for i in range(len(t)):  
    x_verdi = vx_0*t[i]             # Funksjonen for x-verdi
    y_verdi = starthøyde + vy_0*t[i] + g*t[i]**2 # Funksjonen for y-verdi
    x.append(x_verdi)
    #y.append(y_verdi)
    

    if(y_verdi > 0):
        y.append(y_verdi)   
        distanse.append(x_verdi)

    else:
        y.append(0)

    print("t-verdi", t[i], "| x-verdi: ", x[i], "| y verdi: ", y[i])
    
######
distanse_length = len(distanse)

print("distanse = ",  x[distanse_length], "meter")
#####



pplot.plot(x,y)
pplot.grid(True)
##pplot.ylim(0, max(y)+0.3) # Setter øvre og nedre grense på y-aksen
pplot.title("Posisjon til ballen")
pplot.xlabel('x-akse, enhet meter')
pplot.ylabel('y-akse, enhet meter')
pplot.show()





