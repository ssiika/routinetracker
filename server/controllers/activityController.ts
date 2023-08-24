const asyncHandler = require('express-async-handler');
const Activity = require('../models/activityModel');
import express, { Response } from 'express';
import { RequestWUser, ActivityFormat } from '../types';


const addActivity = asyncHandler(async (req: RequestWUser, res: Response) => {
    // timeslots not required when creating activity

    // color should be rgb values formatted as such: 'x, y, z'
    
    const { name, start, color } = req.body;

    const userId = req.user._id;

    if (!name || !start || !color) {
        res.status(400)
        throw new Error('Request must have a name, start date and color')
    }

    const activityAlreadyExists = await Activity.findOne({user: userId, name})

    if (activityAlreadyExists) {
        res.status(400)
        throw new Error('Activity already exists')
    }

    const activity = await Activity.create({
        user: userId,
        name, 
        start,
        color,
        timeslots: []
    }) as ActivityFormat

    res.status(200).json(activity)
})

const getActivities = asyncHandler(async (req: RequestWUser, res: Response) => {
    // Get all activities of a user. Requires user id

    const activities = await Activity.find({"user": req.user._id}) as Array<ActivityFormat>

    res.status(200).json(activities)
})

const updateActivity = asyncHandler(async (req: RequestWUser, res: Response) => {
    // Update color parameter

    const { color } = req.body

    if (color === undefined) {
        res.status(400)
        throw new Error('Request must have color parameter')
    }

    const recordUpdate = await Activity.findOneAndUpdate({"_id": req.params.id, "user": req.user._id}, {$set: {"color": color }}, {returnDocument: 'after'});

    res.status(200).json(recordUpdate)
})


const deleteActivity = asyncHandler(async (req: RequestWUser, res: Response) => {
    const deletedResponse = await Activity.deleteOne({"_id": req.params.id, "user": req.user._id})

    res.status(200).json(deletedResponse)
})


module.exports = {
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity
}