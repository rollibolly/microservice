
/*
roli queue:
amqp://grsshyti:81FUO6HZwBmblm61UmOmbHxHhbNVX2QZ@lark.rmq.cloudamqp.com/grsshyti
edina queue:
amqp://yozjgqvj:t4_pFUkrvooKlZHXCeDw0smDNa8-6UE6@lark.rmq.cloudamqp.com/yozjgqvj
 */

var config = {
    // Mongo db url
    'database_url':'mongodb://admin:admin@ds151228.mlab.com:51228/microservice_database',
    'queue_url':'amqp://grsshyti:81FUO6HZwBmblm61UmOmbHxHhbNVX2QZ@lark.rmq.cloudamqp.com/grsshyti',
    //'queue_url':'amqp://yozjgqvj:t4_pFUkrvooKlZHXCeDw0smDNa8-6UE6@lark.rmq.cloudamqp.com/yozjgqvj',
    'in_queue':'in_queue'
};

module.exports = config;