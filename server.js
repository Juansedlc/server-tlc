const { Socket } = require("dgram")
const net = require("net")
const { type } = require("os")

const server = net.createServer()

server.on("connection", (Socket)=>{
    
    Socket.on("data", (data)=>{
        console.log("Mensaje recibido : "+data)
        var msg = String(data)
        var validate = msg[0].concat(msg[1], msg.slice(-2,-1), msg.slice(-1))
        console.log("validateeeeee: ",validate)
        if(validate == "<[]>"){
            msg = msg.slice(2,-2)
            var Cod_received = parseInt(msg.slice(0,-1))
            var Status_receiverd = msg.slice(-1)
            //if(Cod_received<10000){}
            console.log(Cod_received, "-----", Status_receiverd)
            Socket.write("Recibido!!")
            var CreateObj = new Object()
        }
        else{
            console.log("Los datos enviados no coinciden con el formato")
        }
    })

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
