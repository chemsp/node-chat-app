const path = require('path');

const express = require('express');
const socketIO = require("socket.io");
const http = require('http');
const  publicPath = path.join(__dirname,'/../public');
const  app = express();
 const port = process.env.PORT || 3000;
 

 var server = http.createServer(app);

 var io = socketIO(server);
   io.on('connection',(socket)=>{
       console.log('New User Connnected');

    //    socket.on('createEmail',function(email){
    //     console.log('New email Created', email);
    // });
  
      socket.on('createMessage',function(mssge){
         // console.log(mssge);
         io.emit('newMessage',{
            from: mssge.from,
            text : mssge.text,
            createdAt : new Date().getTime()
                 })   ;

      });


    // socket.emit('newEmail',{
    //   from:"Sunil",
    //   text : "Hello From Sunil",
    //   createdAt: 12344
    // });

    
    
    socket.emit('newMessage',{
        from:" Sunil",
        text : "New Message From Sunil",
        
      });

    // socket.on('disconnect', function(){
    //     console.log('User Disconnected');
    // });
    
    
   });

   

app.use(express.static(publicPath)); 

    


    server.listen(port,()=>{
        console.log(`Server is up and running at ${port}`)
    });