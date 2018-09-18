
var socket  = io();

function scrollBottom(){
  var messages = $('#messList');
  var newMessage = messages.children('li:last-child');
  var clientHeight= messages.prop('clientHeight');
  var scrollHeight = messages.prop('scrollHeight');
  var scrollTop = messages.prop('scrollTop');
  var newMessageHeight = newMessage.innerHeight();
  var lastmessageHeight = newMessage.prev().innerHeight();
  if(clientHeight +scrollTop + newMessageHeight +lastmessageHeight >= scrollHeight){
       messages.scrollTop(scrollHeight);
  }
}
socket.on('connect',function(){
//   console.log('Conntected to Server');

//   socket.emit('createEmail',{
//     to:"margi@gmail.com",
//     text :"Happy Birthday",
//     createdAt : 12343
//   });

var params = $.deparam(window  .location.search);
socket.emit('join',params,function(err){
 
  if(err){
    window.location.href = '/';

  } else{
    console.log('No error');
  }
});

});


// socket.emit('createMessage',{
//   from:"client",
//   text: 'Hello Everyone',
//   createdAt :'12344'
// },function(data){
//   console.log('Got it.',data)
// });

socket.on('updatedUsersList',function(userList){
  var users= $('#users');
  var ol = $('<ol></ol>');
 
  userList.forEach(ele => {
    var li = $('<li></li>');
      li.append(ele);
      ol.append(li);
  });
   users.html(ol); 
});

socket.on('newMessage',function(message){
  var formattedTime =  moment(message.createdAt).format('h:mm a')
   var template = $('#message-template').html();
   var html = Mustache.render(template,{
     text:message.text,
     createdAt : formattedTime,
     from : message.from
   });
     $('#messList').append(html);
     scrollBottom();
  // console.log('newMessage',message);
  // var formattedTime =  moment(message.createdAt).format('h:mm a')
  // var li = $('<li></li>');
  // li.text(`${message.from}     ${formattedTime}  : ${message.text}`);

  // $('#messList').append(li);
  
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
 var locationsendtime = new moment(localStorage.createdAt).format('h:mm a');

 
 var template = $('#location-message-template').html();
 var html = Mustache.render(template,{
   url:locationinfo.text,
   createdAt : locationsendtime,
   from : locationinfo.from
 });
   $('#messList').append(html);
   scrollBottom();
// var li = $('<li></li>');
// var a = $('<a target="_blank">My Current Location</a>')
// console.log(locationinfo.text);
//  a.attr('href',`${locationinfo.text}`);
//   li.text(`${locationinfo.from} ${locationsendtime} :`);
//   li.append(a);
// $('#messList').append(li);


})

$(document).ready(function(){
  var date = new moment();

  var locationButton = $('#send-location');

  locationButton.on('click', function(){
    
  if(!navigator.geolocation){
        alert("Your browser does not support geolocation");
  } 
  locationButton.html('Sending Location');
  locationButton.attr('disabled','disabled');

   navigator.geolocation.getCurrentPosition(function(currposition){
  
     
      socket.emit('createLocationMessage',{
        longitude: currposition.coords.longitude,
        latitude : currposition.coords.latitude
      });
       
     
     locationButton.html('Send Location').removeAttr('disabled');
     
    
   }, function(err){
     alert("Cannot fetch the location")
   });
  });

  $("#message-form").on('submit',function(e){
    e.preventDefault();
     var messageTextbox =  $('[name=message]');
      
    socket.emit('createMessage',{
      text: messageTextbox.val()
      
    },function(){
      messageTextbox.val('');
      
    });
   
  });
});
