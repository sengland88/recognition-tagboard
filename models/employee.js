const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Employee = new Schema({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    admin: {
        type: String,
        required: true
    },
    created: { type: Date, required: true, default: Date.now() },

    comments: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    },
});

Employee.plugin(passportLocalMongoose);

module.exports = mongoose.model('Employee', Employee);