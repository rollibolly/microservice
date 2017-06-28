var database = require('./persistance/dbhandler');
//var commIn = require('./communication/receive');
var commOut = require('./communication/send');

process.on('SIGINT', function() {
    database.closeConnection();
    commOut.closeConnection();
    console.log("Server exits...");
    process.exit();
});

var UsersList = [];
commOut.createConnection();

//database.cleanDatabase();

var onMessageReceived = function(msg){    
    var msgJson = JSON.parse(msg.content.toString());
    var out_queue = msgJson.out_queue
    var message = msgJson.message
    console.log('  => New message from: #%s msg: %s', out_queue, message);

    if (UsersList.indexOf(out_queue) < 0){
        UsersList.push(out_queue);
        broadcastMessage(' New user #' + out_queue, out_queue);
    }
    if (message == 'HELLO'){
        broadcastMessage(' #' + out_queue + ' Joined the conversation.', out_queue);
    }
    else{
        database.pushMessage2Database(out_queue, message, function(timeStamp){
            var outMessage = "Message received at "+ timeStamp;        
            broadcastMessage(message, out_queue);
            //commOut.sendMessage(out_queue, outMessage);    
        });
    }
}

var broadcastMessage = function(message, except){
    console.log('Broadcasting message: %s', message);
    for (let value of UsersList){    
        var msgFormatted = '';
        if (except != value){
            msgFormatted = '#' + except + ': ' + message;
            commOut.sendMessage(value, msgFormatted); 
        } 
    }
}

//commOut.sendMessage('xin_queue', '{"out_queue":"out_queue_name", "message":"this is the actual message"}');

// start to listen
//commIn.startListening(onMessageReceived);

var onUsersPopulated = function(list){    
    UsersList = list;
    console.log("Users list populated ", list); 
    commOut.startListening(onMessageReceived);   
};

database.getUsers(onUsersPopulated);

//database.cleanDatabase();
//database.pushMessage2Database('user1', 'message1');

//var printMessages = function(list){
//    console.log(list);
//}

//var msgList = database.getAllMessages(printMessages);
