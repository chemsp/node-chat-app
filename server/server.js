const path = require('path');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const express = require('express');
const socketIO = require("socket.io");
const http = require('http');
const  publicPath = path.join(__dirname,'/../public');
const  app = express();
 const port = process.env.PORT || 3000;
 const message = require('../server/utils/message'); 

 var server = http.createServer(app);

 var io = socketIO(server);

 var users = new Users();
   io.on('connection',(socket)=>{
       console.log('New User Connnected');

    //    socket.on('createEmail',function(email){
    //     console.log('New email Created', email);
    // });
  
     // socket.emit('newMessage',message.generateMessage("Admin","Welcome to Chat App"));
      // socket.broadcast.emit('newMessage',message.generateMessage('Admin',"New user Joint to Chat room"));
      socket.on('Message1',function(mess){
        socket.broadcast.emit('messageFromAdmin',message.generateMessage('Admin',"New user Joint to Chat room"));
      })

      socket.on('join',function(params,callback){
        if(!isRealString(params.name) || !isRealString(params.room)){
          callback('Name or Room not valid.')
        } else{

          socket.join(params.room);
          users.removeUser(socket.id);
          users.addUser(socket.id, params.name,params.room);
          console.log( 'New USer',users.getUserList(params.room));
          io.to(params.room).emit('updatedUsersList', users.getUserList(params.room));
          // socket.leave('the room name');
          // io.to(''the room name).emit
          // socket.broadcast.to('room name').emit

          socket.emit('newMessage',message.generateMessage("Admin","Welcome to Chat App"));
          socket.broadcast.to(params.room).emit('newMessage',message.generateMessage('Admin',`${params.name} has joined`));
          callback();
        }

      });
      socket.on('createMessage',function(mssge,callback){
        var user = users.getUser(socket.id);
        if(user && isRealString(mssge.text)){
          io.to(user.room).emit('newMessage',message.generateMessage(user.name,mssge.text));
          callback();
        }
         // callback('This from server.');
        
        // socket.broadcast.emit('newMessage',{
        //         from: mssge.from,
        //         text : mssge.text,
        //         createdAt : new Date().getTime()
        //              });

      });

      socket.on('createLocationMessage',(coords)=>{
        var user = users.getUser(socket.id);
        if(user ){
          io.to(user.room).emit('newLocationMessage',message.generateLocationMessage(user.name,coords.longitude,coords.latitude));
  
        }
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

    socket.on('disconnect', function(){
      var user = users.removeUser(socket.id);
     
   if(user){
     io.to(user.room).emit('updatedUsersList', users.getUserList(user.room));

    io.to(user.room).emit('newMessage',message.generateMessage('Admin',`${user.name} left`) );

   }
   
        
    });
    
    
   });

   

app.use(express.static(publicPath)); 

    


    server.listen(port,()=>{
        console.log(`Server is up and running at ${port}`)
    });