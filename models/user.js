var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    fullname: String,
    email: String,
    age: Number,
    gender: String,
    location: String,
    entries: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

module.exports = mongoose.model('User', UserSchema);