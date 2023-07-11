const asyncHandler = require('express-async-handler');
const Record = require('../models/recordModel');
import express, {Request, Response} from 'express';

interface RecordFormat {
    activity_id: String,
    day: Date,
    expected: Number,
    actual: Number
}

const addRecord = asyncHandler(async (req: Request, res: Response) => {
    const { activity_id, day, expected, actual } = req.body;

    if (!activity_id || !day || !expected || !actual) {
        res.status(400)
        throw new Error('Request must have activity id, day, expected and actual parameters')
    }

    const record = await Record.create({
        activity_id, 
        day, 
        expected, 
        actual
    }) as RecordFormat
    
    res.status(200).json(record)
})

const getRecords = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Get record ${req.params.id}`})
})

const updateRecord = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Update record ${req.params.id}`})
})

const deleteRecord = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete record ${req.params.id}`})
})

module.exports = {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord
}