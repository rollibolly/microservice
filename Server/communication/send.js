var amqp = require('amqplib/callback_api');
var config = require('../configuration');
var connection;

var isConnected = false;

var createConnection = function(){
    amqp.connect(config.queue_url, function(err, conn) {
        if (err){ 
            console.log('Can not connect to mq');
        }
        else{
            connection = conn;
            isConnected = true;
        }
    });
}

var closeConnection = function(){
    connection.close();
}

var sendMessage = function(queue, msg){
    if (!isConnected){
        console.log('Not connected to mq...');
    }else{
        connection.createChannel(function(err, ch) {        

            ch.assertQueue(queue, {durable: false}, function(err, ok){
                if (err) console.log(err);
                ch.sendToQueue(queue, new Buffer(msg), function(err, ok){
                    if (err) console.log('[x] Sent failure to %s msg: %s',queue, msg);
                    console.log(" [x] Sent success to %s msg: %s",queue, msg);                
                });
                
            });                        
        });
    }
};

var startListening = function(callback){
    if (!isConnected){
        console.log('Not connected to mq...');
    }else{
        
        connection.createChannel(function(err, ch) {
            if (err) console.log(err);
            var q = config.in_queue;

            ch.assertQueue(q, {durable: false});

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            
            ch.consume(q, function(msg) {                                
                callback(msg);
            }, {noAck: true});
            
        });        
    }

}

module.exports = {sendMessage, createConnection, closeConnection, startListening};