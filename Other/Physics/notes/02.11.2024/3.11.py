import pylab as pl

#constants
m1 = 5.974*10**24
m2 = 7.35*10**22

gamma = 6.67*10**(-11)

def a(r, mass):
    G = gamma * (mass**2)/r**2
    acc = G/mass
    return acc

#starting values
r1 = 0
v1 = 0
r2 = 380000*10**3 #meters from origo
v2 = 0
r = r2-r1
t = 0

#simulate movements
timeSteps = 1 #s
while r > 0:
    v1 = v1 + a(r, m1) * timeSteps
    v2 = v2 - a(r,m2) * timeSteps
    r1 = r1 + (v1* timeSteps)
    r2 = r2 + (v2 * timeSteps)
    r = r2-r1
    t = t + timeSteps #increment time by whatever timesteps is

print("Time for collision to occur: ", t/3600, "h")


# M1 is the earth
# M2 is the moon