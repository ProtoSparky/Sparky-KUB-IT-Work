# -*- coding: utf-8 -*-
"""
For innlesning, beregning med, og plotting av modellrakettdata.

Andøya Space Education

Opprettet 11:04:36 fredag 1. desember 2022
Sist endret [dd.mm.åååå]: 14.12.2022
@forfatter: bjarne.ådnanes.bergtun
"""

# =========================================================================== #
# ============================== Blblioteker ================================ #
import tkinter as tk # gir mulighet for å åpne datavinduer for velging av fil
import tkinter.filedialog as fd # fildialog
from os import path # for å enkelt kunne hente ut filnavn m.m.
import pandas as pd # datainnlesning
import numpy as np # matematikk og lagring av data
import matplotlib.pyplot as plt # plotting

# =========================================================================== #
# ============================== Datainnlesning ============================= #
# Kopier inn filbanen her (hvis du vet den)!
filbane = './LOG00031.TXT'

if filbane == '':
    # Før vi åpner fildialogen, må vi sørge for at vinduet åpner seg øverst
    root = tk.Tk()
    root.withdraw()
    root.wm_attributes('-topmost', 1)
    
    # Her åpner vi vinduet som gjør at vi kan velge filen som skal leses inn
    filbane = fd.askopenfilename(
        title = 'Velg rakettdata som skal leses inn',
        filetypes = (('Tekstfiler','.txt'),('Alle filer','.*')),
        parent = root,
        )
    
    print('\nFilbane (kopier inn i koden for å unngå å måtte velge fil påny!):')
    print(filbane,'\n')

# Vi lagrer filnavn og slikt, slik at vi har det til senere
filnavn, filtype = path.splitext(path.basename(filbane))

# Her leser vi inn dataene
data = pd.read_csv(filbane, delimiter=';')

# Vi splitter dataene i frittstående numpy-lister (dette er unødvendig hvis man
# er kjent med pandas-biblioteket, men gjør ting enklere hvis man ikke er det).
t = data['Time'].to_numpy()/1000 # tid, målt i sekund.
t -= t[0] # sørger for at tiden begynner fra 0
T = data['Temperature'].to_numpy() # temperatur, målt i °C
fi = data['Humidity'].to_numpy() # luftfuktighet, målt i prosent
P = data['Pressure'].to_numpy() # trykk, målt i kPa
a_x = data['Accel_x'].to_numpy() # akselerasjon i x-retning, målt i g
a_y = data['Accel_y'].to_numpy() # akselerasjon i y-retning, målt i g
a_z = data['Accel_z'].to_numpy() # akselerasjon i z-retning, målt i g
rot_x = data['Rot_x'].to_numpy() # rotasjon om x-aksen, målt i dps (Degree pr. second)
rot_y = data['Rot_y'].to_numpy() # rotasjon om y-aksen, målt i dps (Degree pr. second)
rot_z = data['Rot_z'].to_numpy() # rotasjon om z-aksen, målt i dps (Degree pr. second)
mag_x = data['Mag_x'].to_numpy() # magnetfelt i x-retning, målt i gauss eller microtesla (Rev. 2)
mag_y = data['Mag_y'].to_numpy() # magnetfelt i x-retning, målt i gauss eller microtesla (Rev. 2)
mag_z = data['Mag_z'].to_numpy() # magnetfelt i x-retning, målt i gauss eller microtesla (Rev. 2)

# =========================================================================== #
# ============================== Databehandling ============================= #
# Høyde beregnet fra trykk; målt i meter
H_0 = 8500 # [m] Antall meter før trykket blir 1/e lavere
P_0 = P[0] # [kPa] Trykk ved oppskytingssted
h = H_0 * np.log(P_0/P) # Høyde over havet, målt i meter
a_tot = np.sqrt(a_x**2 + a_y**2 + a_z**2)

index = 0
while index < len(a_tot):
    if a_tot[index] > 2:
        h_cut = h[index]
    index += 1




# ================================ Plotting ================================= #
plt.style.use('ggplot')

plt.figure('Some')
plt.plot(t, - T, label='$Grader $')
plt.plot(t, a_y, label='$a_y$')
plt.plot(t, a_z, label='$a_z$')
plt.xlabel("Tid [s]")
plt.ylabel("Akselerasjon [g]")
plt.legend()
plt.grid(linestyle='--')







plt.figure('Total acceleration x')
plt.plot(t, a_tot)
plt.xlabel("Tid [s]")
plt.ylabel("G forces")
plt.legend()
plt.grid(linestyle='--')

''''
plt.figure('Total akselerasjon')
plt.plot(t, a_tot, label='$a$')
plt.xlabel("Tid [s]")
plt.ylabel("Akselerasjon [g]")
plt.legend()
plt.grid(linestyle='--')
'''
plt.figure('Høyde')
plt.plot(t, h)
plt.xlabel("Tid [s]")
plt.ylabel("Høyde [m]")
plt.legend()
plt.grid(linestyle='--')
plt.show()