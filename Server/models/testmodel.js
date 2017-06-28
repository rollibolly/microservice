// load the mongoose schema 
//
var mongoose = require('mongoose'); 

// creat the first schema 
var Schema = mongoose.Schema; 

// creeat the student Schema 
//
var testSchema = new Schema ({
	name: { type: String, required: true},
	message: {type: String, required: true}

	}, {
		// created at and Update at 
		timestamps:true 
	}); 

// Create the model 
//
 var TestModels = mongoose.model('test', testSchema); 

// export it to the other moduls
//
module.exports = TestModels; 
 