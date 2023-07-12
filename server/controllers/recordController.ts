const asyncHandler = require('express-async-handler');
const Record = require('../models/recordModel');
import express, {Request, Response} from 'express';

interface RecordFormat {
    _id: String,
    activity_id: String,
    day: Date,
    expected: Number,
    actual: Number
}

const addRecord = asyncHandler(async (req: Request, res: Response) => {
    const { activity_id, day, expected} = req.body;

    if (!activity_id || !day || !expected) {
        res.status(400)
        throw new Error('Request must have activity id, day and expected parameters')
    }

    const actual = req.body.actual ? req.body.actual : 0

    const record = await Record.create({
        activity_id, 
        day, 
        expected, 
        actual
    }) as RecordFormat
    
    res.status(200).json(record)
})

const getRecords = asyncHandler(async (req: Request, res: Response) => {
    // Get all records of a user. Requires activity id

    const records = await Record.find({"activity_id": req.params.id}) as Array<RecordFormat>

    res.status(200).json(records)
})

const updateRecord = asyncHandler(async (req: Request, res: Response) => {
    // Update actual parameter

    const { actual } = req.body

    if (actual === undefined) {
        res.status(400)
        throw new Error('Request must have actual parameter')
    }

    const recordUpdate = await Record.updateOne({"_id": req.params.id}, {$set: {"actual": actual }});

    res.status(200).json(recordUpdate)
})

const deleteRecord = asyncHandler(async (req: Request, res: Response) => {
    const deletedResponse = await Record.deleteOne({"_id": req.params.id})

    res.status(200).json(deletedResponse)
})

module.exports = {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord
}