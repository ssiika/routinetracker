const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const record = new Schema(
    {
        user: {
            type: String,
            required: [true, 'Please provide user']
        },
        activity_id: {
            type: String,
            required: [true, 'Please provide activity id']
        },
        day: {
            type: Date,
            required: [true, 'Please provide a date']
        },
        time: {
            type: Number
        }
})

module.exports = mongoose.model("record", record);
export {};