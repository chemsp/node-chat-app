var socket  = io();
socket.on('connect',function(){
//   console.log('Conntected to Server');

//   socket.emit('createEmail',{
//     to:"margi@gmail.com",
//     text :"Happy Birthday",
//     createdAt : 12343
//   });

// socket.emit('createMessage',{
//   from:"client",
//   text: 'Hello Everyone',
//   createdAt :'12344'
// });

socket.on('newMessage',function(message){
  console.log('newMessage',message);
  
});


socket.on('welcomeFromAdmin',function(message){
  console.log('welcomeFromAdmin',message);
  
});

socket.on('messageFromAdmin',function(message){
  console.log('messageFromAdmin',message);
  
});
// socket.on('disconnect',function(){
//   console.log('Disconnected from  Server');

// });

// socket.on('newEmail',function(email){
//   console.log('New Mail Received',email);
// });


});
