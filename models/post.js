module.exports = function (mongoose) {
    var Schema = mongoose.Schema;

    var PostSchema = new Schema({
        title: {
            required: true,
            type: String,
            trim: true
        },
        text: {
            type: String,
            trim: true,
            max: 2000
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    });
    return mongoose.model('Post', PostSchema);
}

