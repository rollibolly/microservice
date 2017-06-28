var config = require('../configuration');

var amqp = require('amqplib/callback_api');

var startListening = function(callback){
    amqp.connect(config.queue_url, function(err, conn) {
        conn.createChannel(function(err, ch) {
            if (err) console.log(err);
            var q = config.in_queue;

            ch.assertQueue(q, {durable: false});

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
            
            ch.consume(q, function(msg) {                                
                callback(msg);
            }, {noAck: true});
            
        });
    });
}

module.exports = {startListening};