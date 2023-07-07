const asyncHandler = require('express-async-handler');
import express, {Request, Response} from 'express';

const addActivity = asyncHandler(async (req: Request, res: Response) => {
        res.status(200).json({message: `Set activity ${req.params.id}`})
})

const getActivities = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Get activity ${req.params.id}`})
})

const updateActivity = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Update activity ${req.params.id}`})
})

const deleteActivity = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete activity ${req.params.id}`})
})

module.exports = {
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity
}