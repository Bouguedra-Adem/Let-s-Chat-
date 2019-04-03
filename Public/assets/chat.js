//Make connection
var socket2=io.connect("http://localhost:3000");
var message=document.getElementById('message');
var handle=document.getElementById('handle');
var btn=document.getElementById('send');
var output=document.getElementById('output');
var feedback=document.getElementById('feedback');
var bool=false;
//Emit event
btn.addEventListener('click',function(){
	socket2.emit('chat',{
		message:message.value,
		handle:handle.value,
	});
});
//listento event

socket2.on('chat',function(data){
	feedback.innerHTML='';
	bool=false;
	if (data.message.length!=0){
	output.innerHTML+='<p>'+data.handle+':'+data.message+'</p>';
     }
});

message.addEventListener('keypress',function(){
        
	     if (message!=''){
            socket2.emit('typing',{
		    message:"et entrain d'ecrire un message.....",
		    handle:handle.value,

	     }); }

         if (message ===''){
        	 socket2.emit('typing',{
		    message:"",
		    handle:handle.value,

	        });
	     }  
	     
});

   socket2.on('typing',function(data){
     if (bool===false){
     	
	     feedback.innerHTML+='<p>'+data.handle+':'+data.message+'</p>';
	    
     }
    bool=true;
});