var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	username: String,
	fullname: String,
	email: String,
	age: Number,
	gender: String,
	location: String
});

module.exports = mongoose.model('User', UserSchema);