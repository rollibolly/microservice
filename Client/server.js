#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

// message queue - send message

var qm = function(msg){ 
    amqp.connect('amqp://grsshyti:81FUO6HZwBmblm61UmOmbHxHhbNVX2QZ@lark.rmq.cloudamqp.com/grsshyti', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue('in_queue', {durable: false});
            ch.sendToQueue('in_queue', new Buffer(msg), function(err, ok){
                if (err){
                    console.log("Error!");
                }
                conn.close();
            });
            //console.log("------ Message sent: " + msg + ' ------');
        });

        //setTimeout(function() { conn.close(); process.exit(0) }, 500);
    });
}

// message queue - receive message
var get_res = function() {
    amqp.connect('amqp://grsshyti:81FUO6HZwBmblm61UmOmbHxHhbNVX2QZ@lark.rmq.cloudamqp.com/grsshyti', function(err, conn) {
        conn.createChannel(function(err, ch) {
            ch.assertQueue(out_queue, {durable: false});
            ch.consume(out_queue, function(msg) {
            console.log(msg.content.toString());
            }, {noAck: true});
        });
    });
}

// read data from the console
var out_queue;

console.log("------ Enter your message here: ------");

process.argv.forEach(function (val, index, array) {
  out_queue = array[2];
});

// first call
var firstCall = function(){
    var mess = {
        'out_queue': out_queue,
        'message': 'HELLO'
    } 

    qm(JSON.stringify(mess));
}

firstCall();
get_res();

var stdin = process.openStdin();

stdin.addListener("data", function(d) {   
    var message = d.toString().trim();

    var res = {
        'out_queue': out_queue,
        'message': message
    }

    qm(JSON.stringify(res));
    get_res();
    //process.stdin.destroy();
});


