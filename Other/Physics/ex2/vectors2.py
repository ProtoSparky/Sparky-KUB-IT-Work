import math as mt
v_vector = [[1,3], [2,3]]
selector  = 0
v = mt.sqrt((v_vector[selector][0]**2) + (v_vector[selector][1] ** 2))
e_vector = [[v_vector[selector][0]/v], [v_vector[selector][1]/v]]

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


    
    
print(enhetsvektor(v_vector))

