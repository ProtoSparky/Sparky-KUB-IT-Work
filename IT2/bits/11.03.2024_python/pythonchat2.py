import socket

host = socket.gethostname()
port = 12345 # The same port as used by the server
username = ""

def chat():
    global username
    if username == "":
        username = input("Enter username: ")
        print("You are sending messages as: " + username)
        sendMessage(username)
    else:
        sendMessage(username)

def sendMessage(username):
    while True: # Start of the loop
        new_message = input("Message: ")
        if new_message.lower() == "exit": # Condition to exit the loop
            break
        full_message = username + " | " + new_message
        encoded_message = full_message.encode('utf-8') # Encode the string into bytes

        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.connect((host, port))
        s.sendall(encoded_message) # Send the encoded message
        data = s.recv(1024)
        s.close()
        print("Message sent!")

if __name__ == '__main__':
    chat()