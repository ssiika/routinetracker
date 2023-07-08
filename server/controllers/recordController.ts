const asyncHandler = require('express-async-handler');
import express, {Request, Response} from 'express';

const addRecord = asyncHandler(async (req: Request, res: Response) => {
        res.status(200).json({message: `Set record ${req.params.id}`})
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