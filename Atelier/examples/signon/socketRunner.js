const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()



const socketUserMap = new Map();
const userSocketMap = new Map();

async function execute(io){
    io.on('connection', (socket) => {
        console.log('a user connected' , socket.id);
        
        socket.on('setSocketId', async (msg) => {
          console.log('setSocket id' , msg.name, "====>"  , socket.id );
          socketUserMap.set(socket.id,msg.name)
          userSocketMap.set(msg.name,socket.id)
          console.log("socketTousermap")
          console.log(socketUserMap)
          console.log("userTosocketmap")
          console.log(userSocketMap)
          try{
          const updateStatus = await prisma.user.update({
            where: {
              id: msg.name,
            },
            data: {
              isConnected: true,
            },
          })
          
        }catch(err){
            console.log(err)
          }
          
        });
        socket.on('disconnect', async () => {
          console.log('user disconnected with soc id: '+socket.id);
          try{
          const updateStatus = await prisma.user.update({
            where: {
              id: socketUserMap.get(socket.id),
            },
            data: {
              isConnected: false,
            },
          })
          socketUserMap.delete(socket.id)
          
        }catch(err){
          console.log(err)
        }
        });
        
        socket.on('my message', async (receivedData) => {
          //console.log(receivedData)
          let receiver = receivedData.receiver ;
          let receivedSocketId = userSocketMap.get(receiver)
          let sender = receivedData.sender
          let photo = receivedData.photo
          //console.log(chatData)
          console.log(sender , " msg koreche  user " , receivedSocketId)
          io.to(receivedSocketId).emit('my broadcast' , {sender:receivedData.sender,msg:receivedData.msg,photo:photo});
          // io.emit('my broadcast', `server: ${msg}`);
        });
      });       
}
async function sendNotification(io,notification,sender_id,receiver_id,data){
  let receiver = userSocketMap.get(receiver_id)
  // console.log("func called")
  // console.log(sender_id)
  // console.log(receiver_id)
  // console.log(userSocketMap)
  // console.log(receiver)
  io.to(receiver).emit('notification' , {sender:sender_id,notification:notification,data:data});
}
module.exports = { execute,sendNotification }