const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    submitter: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    type: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    created: { type: Date, required: true, default: Date.now() },
});


module.exports = mongoose.model('Comment', Comment);