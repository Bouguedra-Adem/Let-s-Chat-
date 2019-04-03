var express=require('express');
var app=express();
var socket=require('socket.io');


//set up middlwar
app.set('view engine','ejs');
//file static
app.use(express.static('./public'));
//listen to  the port
var server=app.listen(3000);
//fire controller

app.get('',function(req,res){
  res.render('index');
});
var io=socket(server);
// Quand un client se connecte, on le note dans la console
io.on('connection',function(socket){

  // Quand le serveur reçoit un signal de type "chat" du client  
	socket.on('chat',function(data){
	//envoye le message a tot les client	
     io.sockets.emit('chat',data);

	});
	socket.on('typing',function(data){
		 console.log(data);
		socket.broadcast.emit('typing',data);
	})
})
