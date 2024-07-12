# -*- coding: utf-8 -*-
"""
Dette koden er rammeverket for en enkel numerisk beregning av rakettbaner. I denne koden
er x retning horisonalt, mens y retning vertikalt. For at koden skal fungere må følgende oppgaver løses: 
    - konstanter for utskytingsparametre, rakettmotor, vekt og aerodynamikk må fylles inn
    - uttrykk for baneberegninger i while-løkkene må skrives inn. Her skal Newtons 2 lov brukes til å finne akselerasjon, og 
    bevegelsesligningene for å finne hastighet og posisjon

Andøya Space Education

Opprettet: 11.10.2023
Sist endret: 11.10.2023
@forfatter: Fredrik B. Pettersen
"""

# =========================================================================== #
# ============================== Blblioteker ================================ #
import numpy as np # for matematiske beregninger
import matplotlib.pyplot as plt # for plotting

# =========================================================================== #
# =============================== Konstanter ================================ #
# UTSKYTINGSPARAMETRE (SKRIV INN VERDIER!)
theta = 80# planlagt elevasjon (utskytningsvinkel) målt i grader
g = 9.81# standard tyngdeakselerasjon i m/s^2

# RAKETTMOTOR (SKRIV INN VERDIER!)
T_avg = 6.2# gjennomsnittelig skyvekraft i Newton
t_b = 1.52# motorens brenntid i sekunder
t_d = 3# motorens glidetid i sekunder

# VEKT (SKRIV INN VERDIER!)
m_0 = 150 # rakettens totale startmasse inkludert motor med drivstoff i kg
m_p = 0.0095# drivstoffmassen i kg

# AERODYNAMIKK (SKRIV INN VERDIER!)
C_D = 0.8# rakettens luftmotstandskoeffisient
rho = 1.225# lufttetthet i kg/m^3 
A = np.pi * 0.0185**2# rakettens største tverrsnittareal sett fra fronten i m^2
C_D_P = 1.75# fallskjermens luftmotstandskoeffisient
A_P = np.pi * 0.1**2# fallskjermens areal i m^2

# SIMULERINGSKONSTANTER
dt = 0.01 # tidssteg mellom hver beregning målt i sekund
t_f = 100 # total simuleringstid mål i sekund

# =========================================================================== #
# =================== Initisalisere numeriske beregninger =================== #

# Elevasjonen regnes om til radianer
theta = theta*np.pi/180 

# Alle verdier som skal simuleres må ha en liste hvor hver enkelt beregning kan legges inn
t = np.arange(t_f, step = dt) # tid                         (starter på 0 s)
a_x = np.zeros(np.shape(t)) # horisontal akselerasjon       (starter med 0 m/s^2)
a_y = np.zeros(np.shape(t)) # vertikal akselerasjon         (starter med 0 m/s^2)
v_x = np.zeros(np.shape(t)) # horisontal hastighet          (starter med 0 m/s)
v_y = np.zeros(np.shape(t)) # vertikal hastighet            (starter med 0 m/s)
x = np.zeros(np.shape(t)) # lengde                          (starter fra 0 m)
y = np.zeros(np.shape(t)) # høyde                           (starter fra 0 m)

# definerer en indeks (i) som holder styr på hvor vi er i listene våre
i = 0 # starter på 0
i_max = np.size(t)-1 # maksimal indeks i listene våre; hvis i blir større er vi utenfor listene

# konstantfaktorer i beregningene KAN defineres utenfor løkkene for å spare tid
beta =1/2 * rho * C_D * A # konstant i uttrykket for rakettens luftmotstand
beta_P = 1/2 * rho * C_D_P * A_P # konstant i uttrykket for fallskjermens luftmotstand 
T_x = T_avg * np.cos(theta) # konstant skyvekraft fra motoren i x-retning
T_y = np.sin(theta)# konstant skyvekraft fra motoren i y-retning


# =========================================================================== #
# =========================== Numeriske beregninger ========================= #

while t[i] < t_b: # Baneberegninger mens motoren brenner, dvs. når t er mindre enn brenntiden til motoren
    # Fyll inn utrykk for akselerasjon i x- og y-retning (Newtons 2 lov) 
    a_x[i+1] =  1/m_0 * (T_x - beta * v_x[i] * np.sqrt(v_x[i]**2 + v_y[i]**2 ) )
    a_y[i+1] = 1/m_0 * (T_y - beta * v_y[i] * np.sqrt(v_x[i]**2 + v_y[i]** 2 )) - g
        
    # Hastighet i x- og y-retning. Bruk bevegelsesligningen for hastighet
    v_x[i+1] = a_x[i] * dt  + v_x[i] 
    v_y[i+1] = a_y[i] * dt  + v_y[i]
    
    # Posisjon i x- og y retning. Bruk bevegelsesligningen for posisjon
    x[i+1] = v_x[i] * dt + 1/2 * a_x[i] * dt**2 + x[i]
    y[i+1] = v_y[i] * dt * 1/2 * a_y[i] * dt**2 + y[i]
    
    # Oppdater i. Hvor hver beregning øker indeksen med 1
    i += 1

while t[i] <= t_b + t_d: # Baneberegninger når raketten er i glideflukt. Dvs. motoren har sluttet å brenne, men fallskjermen har enda ikke kommet ut
    # Akselerasjon 
    a_x[i+1] =  1/m_0 * (- beta * v_x[i] * np.sqrt(v_x[i]**2 + v_y[i]**2 ) )
    a_y[i+1] = 1/m_0 * (- beta * v_y[i] * np.sqrt(v_x[i]**2 + v_y[i]** 2 )) - g
        
    # Hastighet
    v_x[i+1] = a_x[i] * dt  + v_x[i] 
    v_y[i+1] = a_y[i] * dt  + v_y[i]
    
    # Posisjon
    x[i+1] = v_x[i] * dt + 1/2 * a_x[i] * dt**2 + x[i]
    y[i+1] = v_y[i] * dt * 1/2 * a_y[i] * dt**2 + y[i]
    
    # Oppdater i
    i += 1

while i < i_max and y[i-1] >= 0: # etter at fallskjermen har kommet ut. Dvs. når tiden som har gått er lengre enn brenntid + glidetid   
    # Aksekerasjon
    a_x[i+1] =  1/m_0 * (- beta_P * v_x[i] * np.sqrt(v_x[i]**2 + v_y[i]**2 ) )
    a_y[i+1] = 1/m_0 * (- beta_P * v_y[i] * np.sqrt(v_x[i]**2 + v_y[i]** 2 )) - g
        
    # Hastighet
    v_x[i+1] = a_x[i] * dt  + v_x[i] 
    v_y[i+1] = a_y[i] * dt  + v_y[i]
    
    # Posisjon
    x[i+1] = v_x[i] * dt + 1/2 * a_x[i] * dt**2 + x[i]
    y[i+1] = v_y[i] * dt * 1/2 * a_y[i] * dt**2 + y[i] 
    
    # Oppdater i
    i += 1

# Raketten har krasjet, så vi sletter unødvendige data
t = t[:i]
x = x[:i]
y = y[:i]
v_x = v_x[:i]
v_y = v_y[:i]
a_x = a_x[:i]
a_y = a_y[:i]

# =========================================================================== #
# ================================ Plotting ================================= #

# Først lukker vi alle åpne figurer, slik at vi slipper å gjøre det manuelt
plt.close('all')
plt.style.use('ggplot')

# Høyde over lengde
plt.figure()
plt.plot(x,y)
plt.xlabel("Lengde [m]")
plt.ylabel("Høyde [m]")
plt.gca().set_aspect(1) # Sørger for at forholdet mellom aksene er 1:1.
plt.grid(linestyle='--')
#plt.show()

# Høyde over tid
plt.figure()
plt.plot(t, y)
plt.xlabel("Tid [s]")
plt.ylabel("Høyde [m]")
plt.grid(linestyle='--')
#plt.show()

# Hastighet over tid
plt.figure()
plt.plot(t, v_x, label='$v_x$')
plt.plot(t, v_y, label='$v_y$')
plt.plot(t, np.sqrt(v_x**2 + v_y**2), label=r'$|\vec{v}|$')
plt.xlabel("Tid [s]")
plt.ylabel("Fart [m/s]")
plt.grid(linestyle='--')
plt.legend()
#plt.show()

# Akselerasjon over tid
plt.figure()
plt.plot(t, a_x, label='$a_x$')
plt.plot(t, a_y, label='$a_y$')
plt.plot(t, np.sqrt(a_x**2 + a_y**2), label=r'$|\vec{a}|$')
plt.xlabel("Tid [s]")
plt.ylabel("Akselerasjon [$m/s^2$]")
plt.grid(linestyle='--')
plt.legend()
plt.show()