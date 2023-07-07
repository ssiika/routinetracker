import express, {Request, Response} from 'express';

const addActivity = (req: Request, res: Response) => {
        res.status(200).json({message: `Set activity ${req.params.id}`})
}

const getActivities = (req: Request, res: Response) => {
    res.status(200).json({message: `Get activity ${req.params.id}`})
}

const updateActivity = (req: Request, res: Response) => {
    res.status(200).json({message: `Update activity ${req.params.id}`})
}

const deleteActivity = (req: Request, res: Response) => {
    res.status(200).json({message: `Delete activity ${req.params.id}`})
}

module.exports = {
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity
}