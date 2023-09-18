import math
pi= 22/7
H = 1
A = 30*(pi/180)
g = 9.81
G = 350
N = math.cos(A) * G
m = 35.7
v0 = 0

xy = 1.0 / math.cos(A)
i=0
while i <= xy:
    print((v0 + g * i) * N)
    i+=1
