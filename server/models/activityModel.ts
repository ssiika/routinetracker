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
        start: {
            type: Date,
            required: [true, 'Please provide start date']
        },
        color: {
            type: String,
            required: [true, 'Please provide color']
        },
        timeslots: [{
            // monday = 0, tuesday = 1 etc.
            day: {
                type: String,
                required: [true, 'Please provide timeslot day']
            },
            startTime: {
                type: String,
                required: [true, 'Please provide timeslot start time']
            },
            endTime: {
                type: String,
                required: [true, 'Please provide timeslot end time']
            }
        }
        ]
    }
)

module.exports = mongoose.model("activity", activity);
export {};