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


const deleteActivity = asyncHandler(async (req: Request, res: Response) => {
    const deletedResponse = await Activity.deleteOne({"_id": req.params.id})

    res.status(200).json(deletedResponse)
})


module.exports = {
    addActivity,
    getActivities,
    deleteActivity
}