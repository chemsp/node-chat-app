
var socket  = io();
socket.on('connect',function(){
//   console.log('Conntected to Server');

//   socket.emit('createEmail',{
//     to:"margi@gmail.com",
//     text :"Happy Birthday",
//     createdAt : 12343
//   });

});


// socket.emit('createMessage',{
//   from:"client",
//   text: 'Hello Everyone',
//   createdAt :'12344'
// },function(data){
//   console.log('Got it.',data)
// });

socket.on('newMessage',function(message){
  console.log('newMessage',message);
  var li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  $('#messList').append(li);
  
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


$(document).ready(function(){


  $("#message-form").on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
      from:"User",
      text: $('[name=message]').val()
      
    },function(){
      
    });
    
      
  });
});
