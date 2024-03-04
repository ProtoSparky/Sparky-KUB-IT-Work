import math as math
acc = 8.7
size_car = 20 * 10^-2 #cm 
area = (size_car*size_car)
weightcar = 0.25 #kg
weightweight = 2 #kg
magnet_strength = 0.3 #T
resistance = 0.040 #ohm
car2fieldgap = 20*10^-2 #m
max_length = 0.2 #max max length of runner
sim_stepping = 0.001
start_velocity = math.sqrt(2*acc* max_length)

total_distance = 0
VelocityLast = 0
CurrentTime = 0
CurrentAcc = acc
CurrentDistance = 0


while total_distance < max_length:
    CurrentTime = CurrentTime + sim_stepping
    VelocityLast = CurrentAcc * CurrentTime
    total_distance = total_distance + VelocityLast + CurrentTime

    current_ems = math.sqrt(2*CurrentAcc *CurrentDistance) * magnet_strength * size_car
    current_brake_force = ((current_ems)/(resistance)) * size_car *magnet_strength

    print(current_brake_force)


    
    