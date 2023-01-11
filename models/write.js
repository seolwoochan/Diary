const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userTitle: {
        type: String,
        required: true
    },
    userContent: {
        type: String,
        required: true
    },
    unique: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
});

const post = mongoose.model('writes', postsSchema);
module.exports = post;