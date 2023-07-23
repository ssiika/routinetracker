const asyncHandler = require('express-async-handler');
const Record = require('../models/recordModel');
import express, {Request, Response} from 'express';
import { RequestWUser, RecordFormat } from '../types'

const addRecord = asyncHandler(async (req: RequestWUser, res: Response) => {
    const { activity_id, day, time} = req.body;

    if (!activity_id || !day || !time) {
        res.status(400)
        throw new Error('Request must have activity id, day and time parameters')
    }

    const record = await Record.create({
        user: req.user._id,
        activity_id, 
        day, 
        time
    }) as RecordFormat
    
    res.status(200).json(record)
})

const getRecords = asyncHandler(async (req: RequestWUser, res: Response) => {
    // Get all records of a user. Requires activity id

    const records = await Record.find({"user": req.user._id}) as Array<RecordFormat>

    res.status(200).json(records)
})

const updateRecord = asyncHandler(async (req: RequestWUser, res: Response) => {
    // Update actual parameter

    const { actual } = req.body

    if (actual === undefined) {
        res.status(400)
        throw new Error('Request must have actual parameter')
    }

    const recordUpdate = await Record.updateOne({"_id": req.params.id, "user": req.user._id}, {$set: {"actual": actual }});

    res.status(200).json(recordUpdate)
})

const deleteRecord = asyncHandler(async (req: RequestWUser, res: Response) => {
    const deletedResponse = await Record.deleteOne({"_id": req.params.id, "user": req.user._id})

    res.status(200).json(deletedResponse)
})

module.exports = {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord
}