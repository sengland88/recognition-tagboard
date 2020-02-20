const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Employee = new Schema({
    // identity: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
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
    created: { type: Date, required: true, default: Date.now() },
});


module.exports = mongoose.model('Employee', Employee);