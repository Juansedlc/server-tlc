import socket
import binascii
host = "Localhost"
port = 4000
try:
    socket1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socket1.connect((host,port))
    print("Inicializando Cliente...")

    varBool = True
    while varBool:
        Cod_sender = input("Ingrese su numero de serie o ingrese 0 para salir: ")
        Cod_sender_Hex = hex(int(Cod_sender))
        Status_sender= input("Ingrese el estado que desea registrar, 0 ---> desconectado, 1 ---> conectado, ó D ---> eliminar: ")
        msg = "<["+str(Cod_sender_Hex)+str(Status_sender)+"]>"
        if Cod_sender != "0":
            socket1.send(msg.encode(encoding="ascii",errors="ignore"))
            response = socket1.recv(1024)
            print("\nServidor responde: ", response.decode(encoding="ascii", errors="ignore"))
        if Cod_sender == "0":
            varBool= False
    socket1.close()
except:
    print("No fue posible establecer conexión con el servidor")
