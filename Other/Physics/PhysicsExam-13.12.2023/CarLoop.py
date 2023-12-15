import pylab as py
Gravitasjon = 9.81 # m/s^2
LoopRadius = 20 #meter
MinimumFart = py.sqrt(Gravitasjon * LoopRadius)
print("minimum farten for at bilen kan kjøre i en loop er: "+ str(MinimumFart) + " m/s når radius på loop er: " + str(LoopRadius) + " m")