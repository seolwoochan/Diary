const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    userPw: {
        type: String,
        required: true
    },
});

const post = mongoose.model('accounts', postsSchema);
module.exports = post;