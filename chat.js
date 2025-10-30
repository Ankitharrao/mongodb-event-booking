const webSocket = require('ws');
const chatServer =new webSocket.Server({port:9001});
console.log('chat server is running on port 9001');
let messages =[];
chatServer.on('connection',(ws)=>{
    ws.on('message',(msg)=>{
        console.log('message received:'+msg);
    });
    ws.on('close',()=>{
        console.log('client disconnected');
    });
    
})