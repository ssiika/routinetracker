const asyncHandler = require('express-async-handler');
import express, {Request, Response} from 'express';

const addTimeslot = asyncHandler(async (req: Request, res: Response) => {
        res.status(200).json({message: `Set timeslot ${req.params.id}`})
})

const getTimeslots = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Get timeslot ${req.params.id}`})
})

const updateTimeslot = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Update timeslot ${req.params.id}`})
})

const deleteTimeslot = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete timeslot ${req.params.id}`})
})

module.exports = {
    addTimeslot,
    getTimeslots,
    updateTimeslot,
    deleteTimeslot
}