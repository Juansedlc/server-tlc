
const net = require("net")
const server = net.createServer()

server.on("connection", (Socket)=>{
    const devices = {}
    const format =/^<\[([0-9A-F0-9A-Fa-f]{4}[01D1])\]>$/; 
    Socket.on("data", (data)=>{

        try {
            console.log("Mensaje recibido : "+data)
            const msg = data.toString().trim()

            if (format.test(msg)) {
                const converted_code= msg.replace(/[<>\[\]]/g, '');
                const device_number= parseInt(converted_code.slice(0,4) ,16);
                const device_status=converted_code.slice(-1);

                if(devices[device_number]){

                    if (device_status==="D") {
                        delete devices[device_number];
                        console.log(`\nEl dispositivo (${device_number}) ha sido eliminado del registro.`);
                        Socket.write(`\nDispositivo (${device_number}) eliminado.`);
                    }
                    else if (devices[device_number].status==1 && device_status==1) {
                        console.log(`\nEl dispositivo (${device_number}) ya se encuentra conectado (${device_status}).`);
                        Socket.write(`\nEl estado del dispositivo ya era conectado (1)`);
                    } 
                    else if(devices[device_number].status==0 && device_status==0){
                            console.log(`\nEl dispositivo (${device_number}) ya se encuentra desconectado (${device_status}).`);
                            Socket.write(`\nEl estado del dispositivo ya era desconectado(0)`);
                    }
                    else if(devices[device_number].status!==device_status){
                        devices[device_number].status = parseInt(device_status);
                        console.log(`\nEl estado del dispositivo (${device_number}) ha sido actualizado a (${device_status}).`);
                        Socket.write(`\nEl estado del dispositivo (${device_number}) ha sido actualizado`);
                    }}
                
                else if(!devices[device_number] && device_status==="D"){
                        console.log("\nEste dispositivo no se puede eliminar ya que no existe.")
                        Socket.write(`\nEste dispositivo no se puede eliminar ya que no existe.`);
                    }   
                else{
                    devices[device_number]={number:device_number, status: parseInt(device_status)}
                    console.log("\nNuevo dispositivo añadido")
                    Socket.write(`\nDispositivo agregado al registro`);
                    }
                                        }
        }catch(error){
            console.error(`Error al manipular la data proveniente del cliente: ${error}`);            
             }
                                }
                )

    Socket.on("close", ()=>{
        console.log("Comunicacion Finalizada")
    })

    Socket.on("error", (error)=>{
        console.log("Se presento un error: " +error.message)
    })
}) 

server.listen(4000, ()=>{
    console.log("Servidor escuchando en el Puerto: "+server.address().port)
})
