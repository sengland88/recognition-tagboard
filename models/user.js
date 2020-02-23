const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: {
        type: String,
        // required: 'Email address is required',
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    firstname: {
        type: String,
        // required: true,
    },
    lastname: {
        type: String,
        // required: true,
    },
    position: {
        type: String,
        // required: true,
    },
    department_id: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        // required: true
    },
    admin: {
        type: Boolean,
        default: false
    },

    created: { type: Date, required: true, default: Date.now() },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);