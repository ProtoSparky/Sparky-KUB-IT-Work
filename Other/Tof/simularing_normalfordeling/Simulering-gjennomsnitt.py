from pylab import *

N=10000
n=4    
my=8
sigma=2

snitt_X = [ ]  # tom liste for gjennomsnittene

for i in range(N):                   # løkke som simulerer N gjennomsnitt 
    X = normal(my,sigma,size=n)      # Simulerer n normalfordelte variabler
    snitt_X.append(mean(X))          # Legger gjennomsnittet til i lista     # 

# Tegner histogram for gjennomsnittene
hist(snitt_X, bins=linspace(0,16,40),density=True,edgecolor="White", color='b')

# Definerer normaltettheten til X-ene og tegner den i diagrammet:
def f(x):
    return (1/(sigma*sqrt(2*pi)))*exp(-(x-my)**2/(2*sigma**2))
x=linspace(my-4*sigma, my+4*sigma, 100)
plot(x, f(x), 'r')
ylim(0,0.4)
show()