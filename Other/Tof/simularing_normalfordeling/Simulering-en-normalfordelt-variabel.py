from pylab import *

n=10000    #lengde på datasett 
my=8       #flytter midten på normalfordeling kurven langs x.
sigma=2    #endrer på skalaen til x

# Simulerer n verdier av X og tegner histogram
X = normal(my,sigma,size=n)  
hist(X, bins=linspace(0,16,40),density=True,edgecolor="White", color='b')

# Definerer normaltettheten og tegner den i diagrammet:
def f(x):
    return (1/(sigma*sqrt(2*pi)))*exp(-(x-my)**2/(2*sigma**2))
x=linspace(my-4*sigma, my+4*sigma, 100)
plot(x, f(x), 'r')
ylim(0,0.4)
show()





