U = 1.0
B = 1.5
R = 0.50
m = 0.010
L = 0.10 

v = 0
s = 0
t = 0
dt = 0.000001

while v <= 1.0:
    a = (U*L*B - v* B**2 * L**2)/(R*m)
    v = a * t
    s = v*t
    t = t+dt
print(t)