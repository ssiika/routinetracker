const asyncHandler = require('express-async-handler');
const Activity = require('../models/activityModel');
import express, {Request, Response} from 'express';

interface TimeslotFormat {
    day: Number,
    starttime: Number,
    duration: Number
}

const addTimeslot = asyncHandler(async (req: Request, res: Response) => {
    const { day, starttime, duration } = req.body
        
    if (day === undefined || starttime === undefined || duration === undefined) {
        res.status(400)
        throw new Error('Request must have day, starttime and duration parameters')
    }

    const timeslotObject = {
        day, 
        starttime,
        duration
    }

    const timeslotUpdate = await Activity.updateOne({_id: req.params.id}, {$push: {"timeslots": timeslotObject }});

    res.status(200).json(timeslotUpdate)
})

const getTimeslots = asyncHandler(async (req: Request, res: Response) => {
    const activityObject = await Activity.findOne({_id: req.params.id})

    res.status(200).json(activityObject.timeslots)
})


const deleteTimeslot = asyncHandler(async (req: Request, res: Response) => {
    // id should have format `${activityid}-${timeslotid}`

    const [activityid, timeslotid] = req.params.id.split('-')

    const deletedResponse = await Activity.updateOne({"_id": activityid}, {$pull: {"timeslots": {_id: timeslotid}}})

    res.status(200).json(deletedResponse)
})

module.exports = {
    addTimeslot,
    getTimeslots,
    deleteTimeslot
}