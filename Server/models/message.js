// load the mongoose schema 
//
var mongoose = require('mongoose'); 

// creat the first schema 
var Schema = mongoose.Schema; 

// creeat the student Schema 
//
var MessageSchema = new Schema ({
	user: { type: String, required: true},
	message: {type: String, required: true}

	}, {
		// created at and Update at 
		timestamps:true 
	}); 

// Create the model 
//
 var MessageModels = mongoose.model('message', MessageSchema); 

// export it to the other moduls
//
module.exports = MessageModels; 