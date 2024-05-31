ne = 10 
a = []
a.append(0)
a.append(1)
i= 2
while i < ne:
    a.append(a[i-1] + a[i-2])
    i += 1

print(a)
print(len(a))