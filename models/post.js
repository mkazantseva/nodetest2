var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PostSchema   = new Schema({
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
        id: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    comments: [{
        text: {
            type: String,
            trim: true,
            max:2000
        },
        author: {
            id: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    }]
});

module.exports = mongoose.model('Post', PostSchema);