import socket
import threading
import re


if __name__ == "__main__":

    host = "Localhost"
    port = 4000

    response_received = threading.Event()
    
    def receive_messages():
        while (True):
            try:
                response = socket1.recv(1024)
                print("\nServidor responde: ", response.decode(encoding="ascii", errors="ignore"))
                if not response:
                    break
                response_received.set()
                
            except Exception as e:
                print(f'Error al recibir datos del servidor: {e}')
                break
    try:
        socket1 = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socket1.connect((host,port))
        print("Inicializando Cliente...")


        receive_thread = threading.Thread(target=receive_messages)
        receive_thread.daemon = True
        receive_thread.start()

        varBool = True
        while varBool:
            format=r'^<\[[0-9A-Fa-f]{4}[01D]]\>$'
            Cod_sender = input("Ingrese su numero de serie o ingrese 0 para salir: ")
            Cod_sender_Hex = hex(int(Cod_sender))
            Status_sender= input("Ingrese el estado que desea registrar, 0 ---> desconectado, 1 ---> conectado, ó D ---> eliminar: ")
            msg=f"<[{Cod_sender_Hex[2:].zfill(4)}{Status_sender}]>"

            if Cod_sender != "0":   
                if re.match(format, msg):
                    try:
                        # Send data to the server 
                        message = msg
                        socket1.sendall(message.encode())

                        #awaiting for servers response
                        response_received.wait()
                        response_received.clear()

                    except Exception as e:
                            print(f'Hubo un error al enviar datos al servidor, por favor verifique código fuente: {e}')
            
            if Cod_sender == "0":
                varBool= False
    except:
        print("No fue posible establecer conexión con el servidor")
    finally:
        socket1.close() 