const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Department = new Schema({
    name: {
        type: String,
        required: true,
    },    

    created: { type: Date, required: true, default: Date.now() },
});

module.exports = mongoose.model('Department', Department);