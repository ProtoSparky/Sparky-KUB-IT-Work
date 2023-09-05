import matplotlib.pyplot as pplot
from math import *
from numpy import * 

antall_punkter = 500
t = linspace(0, 25, antall_punkter) # 0 er starttidspunkt, 10 er sluttidspunkt målt i sekunder. Antall punkter forteller oss hvor mange datapunkter vi lagrer imellom dette. 
x = [] # Liste med x-verdier
y = [] # Liste med y-verdier

g = -9.81 # m/s^2
v_0 = 343  #  10 Startfart m/s
utskytingsvinkel = 45
starthøyde = 0.2 # m

# Utregninger 
utskytingsvinkel = deg2rad(utskytingsvinkel) # grader
vx_0 = v_0*cos(utskytingsvinkel) 
vy_0 = v_0*sin(utskytingsvinkel)



for i in range(len(t)):
    x_verdi = vx_0*t[i]             # Funksjonen for x-verdi
    y_verdi = starthøyde + vy_0*t[i] + g*t[i]**2 # Funksjonen for y-verdi
    x.append(x_verdi)
    y.append(y_verdi)
    print("t-verdi", t[i], "| x-verdi: ", x[i])

pplot.plot(x,y)
pplot.grid(True)
pplot.ylim(0, max(y)+0.3) # Setter øvre og nedre grense på y-aksen
pplot.title("Posisjon til ballen")
pplot.xlabel('x-akse, enhet meter')
pplot.ylabel('y-akse, enhet meter')
pplot.show()

