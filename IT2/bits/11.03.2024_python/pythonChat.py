import socket
import threading

def handle_client(conn, addr):
    print('Connected by', addr)
    message_error = False
    while True:
        try:
            data = conn.recv(1024)
            if not data: break
            if message_error == True:
                message_error = False
            print(data.decode('utf-8'))
        except socket.error:
            if message_error == False:
                print("Ip disconnected ", addr)
            message_error = True
    conn.close()

host = ''        # Symbolic name meaning all available interfaces
port = 12345     # Arbitrary non-privileged port
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.bind((host, port))

print(host, port)
s.listen(1)

while True:
    conn, addr = s.accept()
    threading.Thread(target=handle_client, args=(conn, addr)).start()