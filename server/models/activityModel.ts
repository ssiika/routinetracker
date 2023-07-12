const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activity = new Schema(
    {
        user: {
            type: String,
            required: [true, 'Please provide user']
        },
        name: {
            type: String,
            required: [true, 'Please provide name']
        },
        timeslots: [{
            // monday = 0, tuesday = 1 etc.
            day: {
                type: Number,
                required: [true, 'Please provide timeslot day']
            },
            starttime: {
                type: Number,
                required: [true, 'Please provide timeslot start time']
            },
            duration: {
                type: Number,
                required: [true, 'Please provide timeslot duration']
            }
        }
        ]
})

module.exports = mongoose.model("activity", activity);
export {};