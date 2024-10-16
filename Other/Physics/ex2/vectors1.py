import pylab as pl 
import math as mt
def enhetsvektor(v):
    #go through all arrays
    v_len = len(v)
    pointer = 0
    e_vector = []
    while v_len > pointer:
        current_v = mt.sqrt((v[pointer][0]**2) + (v[pointer][1] ** 2))
        current_e_vector = [[v[pointer][0]/current_v], [v[pointer][1]/current_v]]
        e_vector.append(current_e_vector)
        pointer+= 1
    return e_vector
#constants
v0 = 42.7 #m/s
k = 1.31*10**-3 #kg/m
m= 0.145 #kg
y0= 1.2 #m
theta = pl.radians(40) #vinkel opp fra bakken
g = 9.81 #m/s²

# Konstante krefter
G = pl.array([0, -m*g])

#utregning
def a(v):
    ev = enhetsvektor(v) # motratt rettet vektor for luftmotstand
    L = -k * enhetsvektor(v)**2 * ev #luftmotstand
    sum_F = G + L #sum av vektorer, altså N
    acc = sum_F/m
    return acc

#startverdier
start_position = pl.array([0,y0]) #start høyde
start_speed = pl.array([v0 * pl.cos(theta), v0*pl.sin(theta)]) #sartfart
time = 0 ##starter fra 0 sekunder

#verdilagring
position_list = [start_position]
speed_list = [start_speed]
# sim
steps = 0.001
while start_position[1] >= 0:
    start_speed = start_speed +a(start_speed) * steps # populate start speed
    start_position = start_position + start_speed * steps #populate next position
    time = time + steps
    ##save data
    position_list = pl.concatenate([position_list, [start_position]])
    speed_list = pl.concatenate([speed_list, [start_speed]])

pl.plot(speed_list[:,0], speed_list[:,1]) 
pl.title("Skråplan kast med luftmotstans")
pl.xlabel("$x$ / m")
pl.ylabel("$y$ /m")
pl.grid()
pl.show()





