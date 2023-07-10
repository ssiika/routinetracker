const asyncHandler = require('express-async-handler');
const Activity = require('../models/activityModel');
import express, {Request, Response} from 'express';

interface ActivityFormat {
    _id: string;
    user: string;
    name: string;
    timeslots: { day: number, starttime: number, duration: number }[];
}

const addActivity = asyncHandler(async (req: Request, res: Response) => {
    // timeslots not required when creating activity
    const { user, name } = req.body;

    if (!user || !name) {
        res.status(400)
        throw new Error('Request must have a user and a name')
    }

    const activityAlreadyExists = await Activity.findOne({user, name})

    if (activityAlreadyExists) {
        res.status(400)
        throw new Error('Activity already exists')
    }

    const activity = await Activity.create({
        user,
        name, 
        timeslots: []
    }) as ActivityFormat

    res.status(200).json(activity)
})

const getActivities = asyncHandler(async (req: Request, res: Response) => {
    // Get all activities of a user. Requires user id

    const activities = await Activity.find({"user": req.params.id}) as Array<ActivityFormat>

    res.status(200).json(activities)
})

const updateActivity = asyncHandler(async (req: Request, res: Response) => {
    // Route to change name of id
    res.status(200).json({message: `Update activity ${req.params.id}`})
})

const deleteActivity = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete activity ${req.params.id}`})
})

/*      user: {
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
        */

module.exports = {
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity
}