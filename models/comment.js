const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = new Schema({
    submitter_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        // required: true
    },
    receiver_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true
    },
    comment: {
        type: String,
        required: true,
        unique: true
    },
    created: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model('Comment', Comment);