const path = require('path');

const express = require('express');
const socketIO = require("socket.io");
const http = require('http');
const  publicPath = path.join(__dirname,'/../public');
const  app = express();
 const port = process.env.PORT || 3000;
 const message = require('../server/utils/message'); 

 var server = http.createServer(app);

 var io = socketIO(server);
   io.on('connection',(socket)=>{
       console.log('New User Connnected');

    //    socket.on('createEmail',function(email){
    //     console.log('New email Created', email);
    // });
  
      socket.emit('newMessage',message.generateMessage("Admin","Welcome to Chat App"));
      socket.broadcast.emit('newMessage',message.generateMessage('Admin',"New user Joint to Chat room"));
      socket.on('Message1',function(mess){
        socket.broadcast.emit('messageFromAdmin',message.generateMessage('Admin',"New user Joint to Chat room"));
      })
      socket.on('createMessage',function(mssge,callback){
          console.log(mssge);
         // callback('This from server.');
         io.emit('newMessage',message.generateMessage(mssge.from,mssge.text));

        // socket.broadcast.emit('newMessage',{
        //         from: mssge.from,
        //         text : mssge.text,
        //         createdAt : new Date().getTime()
        //              });

      });


    // socket.emit('newEmail',{
    //   from:"Sunil",
    //   text : "Hello From Sunil",
    //   createdAt: 12344
    // });

    
    
    // socket.emit('newMessage',{
    //     from:" Sunil",
    //     text : "New Message From Sunil",
        
    //   });

    // socket.on('disconnect', function(){
    //     console.log('User Disconnected');
    // });
    
    
   });

   

app.use(express.static(publicPath)); 

    


    server.listen(port,()=>{
        console.log(`Server is up and running at ${port}`)
    });