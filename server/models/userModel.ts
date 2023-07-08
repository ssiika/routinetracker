const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema(
    {
    username: {
        type: String,
        required: [true, 'Please provide a username'], 
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
})

module.exports = mongoose.model("user", user);
export {};