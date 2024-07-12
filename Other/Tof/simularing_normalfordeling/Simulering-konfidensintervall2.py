from pylab import * 
import scipy.stats as stats

N=50   
n=6 
my=8
sigma=2
t025 = stats.t.ppf(0.975,n-1)
    
nedre=[]    
ovre=[]                        
for i in range(N):             
    X_verdier = normal(my, sigma, size = n)  
    S=std(X_verdier, ddof=1)
    nedre.append(mean(X_verdier)-t025*S/sqrt(n))
    ovre.append(mean(X_verdier)+t025*S/sqrt(n))
figure(figsize=(3,4))
for i in range(N):
    plot([nedre[i],ovre[i]], [i+1,i+1], 'b')
plot([my,my],[0,N+1], 'red')
xlim(3,13)
ylim(0,51)
xticks([3,8,13])
show()



