// load mongoose
var  mongoose = require ('mongoose'); 
// load the configuration module 
var config = require('../configuration');  
var moment = require('moment');

var TestModels = require('../models/testmodel');
var MessageModels = require('../models/message');

mongoose.Promise = global.Promise;
mongoose.connect(config.database_url); 
// create the db handler 
var db = mongoose.connection; 

// register some actions on different events 
//
db.on('error', console.error.bind(console, 'Connection error:')); 

db.once('open',   function (){
    console.log('Connection success');
  });

var pushMessage2Database = function(username, message, callback){
    var newMessage = MessageModels({
        user: username,
        message: message
    });    

    newMessage.save( function (err) { 
		if (err) throw err; 
		console.log ('Message saved to the database');  
        var time = moment();
        var time_format = time.format('YYYY-MM-DD HH:mm:ss Z');       
        callback(time_format);
	});  
}

var getAllMessages = function(callback){
    console.log('Try to retreive data from database...');
    MessageModels.find({}, function ( err, messagesList) {
		if (err) throw err;   
        callback(messagesList);
	}); 
    console.log('Retreive request sent...');
}

var cleanDatabase = function(){
    db.collection('messages').drop ( function () { 
        console.log('Database cleaned');
	}); 
}

var closeConnection = function(){
    console.log('Database connection closeing...')
    db.close();
}

var getUsers = function(callback){
    MessageModels.distinct('user', function ( err, result) {
		if (err) throw err;  
        callback(result);
	}); 
}

module.exports = {
    pushMessage2Database, 
    getAllMessages, 
    cleanDatabase, 
    closeConnection,
    getUsers
};