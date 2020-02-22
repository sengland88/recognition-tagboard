const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Comment = new Schema({
    // type: {
    //     type: String,
    //     required: true
    // },
    comment: {
        type: String,
        required: true
    },
    created: { type: Date, required: true, default: Date.now() },
});

Comment.plugin(passportLocalMongoose);

module.exports = mongoose.model('Comment', Comment);