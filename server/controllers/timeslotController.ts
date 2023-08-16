const asyncHandler = require('express-async-handler');
const Activity = require('../models/activityModel');
import express, {Request, Response} from 'express';
import { RequestWUser, TimeslotFormat } from '../types';

const addTimeslot = asyncHandler(async (req: RequestWUser, res: Response) => {
    const { day, startTime, endTime } = req.body
        
    if (day === undefined || startTime === undefined || endTime === undefined) {
        res.status(400)
        throw new Error('Request must have day, starttime and endtime parameters')
    }

    const timeslotObject = {
        day, 
        startTime,
        endTime
    }

    const timeslotUpdate = await Activity.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {$push: {"timeslots": timeslotObject }}) as TimeslotFormat;

    res.status(200).json(timeslotUpdate)
})

const getTimeslots = asyncHandler(async (req: RequestWUser, res: Response) => {
    const activityObject = await Activity.findOne({_id: req.params.id, user: req.user._id})

    if (!activityObject) {
        res.status(400)
        throw new Error('Activity not found')
    }

    res.status(200).json(activityObject.timeslots)
})


const deleteTimeslot = asyncHandler(async (req: RequestWUser, res: Response) => {
    // id should have format `${activityid}-${timeslotid}`

    const [activityid, timeslotid] = req.params.id.split('-')

    const deletedResponse = await Activity.updateOne({"_id": activityid, "user": req.user._id}, {$pull: {"timeslots": {_id: timeslotid}}})

    res.status(200).json(deletedResponse)
})

module.exports = {
    addTimeslot,
    getTimeslots,
    deleteTimeslot
}