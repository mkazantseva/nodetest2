module.exports = function (mongoose) {
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

    return mongoose.model('User', UserSchema);
}