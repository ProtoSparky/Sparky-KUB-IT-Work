import pylab as pl

#general constants
m = 0.400
angle = 30
theta = pl.radians(angle)
my = 0.35
g = 9.81

#constant forces
Gx = m * g * pl.sin(theta)
Gy = m * g * pl.cos(theta)
N = Gy

#variable forces
def acceleration(v):
    R = - pl.sign(v) * my * N
    sum_F = -Gx + R
    acc = sum_F/m
    return acc

#starting values
s = 0
v = 3.20
t = 0

#data storage
s_values = [s]
v_values = [v]
t_values = [t]

#simulation of movement
steps = 0.001

while s >= 0:
    v = v + acceleration(v) * steps
    s = s + v * steps
    t = t + steps

    #saving the data
    v_values.append(v)
    s_values.append(s)
    t_values.append(t)

#draw the graph

pl.plot(t_values, v_values)
pl.xlabel("$t$ / s")
pl.ylabel("$v$ / (m/s)")
pl.title("Graph of speed on angle")
pl.grid()
pl.show()
