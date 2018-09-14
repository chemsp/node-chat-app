
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

socket.on('newLocationMessage',function(locationinfo){
console.log(locationinfo);
var li = $('<li></li>');
var a = $('<a target="_blank">My Current Location</a>')
console.log(locationinfo.text);
 a.attr('href',`${locationinfo.text}`);
  li.text(`${locationinfo.from} :`);
  li.append(a);
$('#messList').append(li);
})

$(document).ready(function(){

  var locationButton = $('#send-location');

  locationButton.on('click', function(){
  if(!navigator.geolocation){
        alert("Your browser does not support geolocation");
  } 
   navigator.geolocation.getCurrentPosition(function(currposition){
     socket.emit('createLocationMessage',{
       longitude: currposition.coords.longitude,
       latitude : currposition.coords.latitude
     })
   }, function(err){
     alert("Cannot fetch the location")
   });
  });

  $("#message-form").on('submit',function(e){
    e.preventDefault();

    socket.emit('createMessage',{
      from:"User",
      text: $('[name=message]').val()
      
    },function(){
      
    });
    
      
  });
});
