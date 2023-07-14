const asyncHandler = require('express-async-handler');
const Activity = require('../models/activityModel');
const User = require('../models/userModel')
import express, {Request, Response} from 'express';

interface ActivityFormat {
    _id: string;
    user: string;
    name: string;
    timeslots: { day: number, starttime: number, duration: number }[];
}

interface RequestWUser extends Request {
    user: any
  }


const addActivity = asyncHandler(async (req: RequestWUser, res: Response) => {
    // timeslots not required when creating activity
    const { name } = req.body;

    const userId = req.user._id;

    if (!name) {
        res.status(400)
        throw new Error('Request must have a name')
    }

    const activityAlreadyExists = await Activity.findOne({userId, name})

    if (activityAlreadyExists) {
        res.status(400)
        throw new Error('Activity already exists')
    }

    const activity = await Activity.create({
        user: userId,
        name, 
        timeslots: []
    }) as ActivityFormat

    res.status(200).json(activity)
})

const getActivities = asyncHandler(async (req: RequestWUser, res: Response) => {
    // Get all activities of a user. Requires user id

    const activities = await Activity.find({"user": req.user._id}) as Array<ActivityFormat>

    res.status(200).json(activities)
})


const deleteActivity = asyncHandler(async (req: RequestWUser, res: Response) => {
    const deletedResponse = await Activity.deleteOne({"_id": req.params.id, "user": req.user._id})

    res.status(200).json(deletedResponse)
})


module.exports = {
    addActivity,
    getActivities,
    deleteActivity
}