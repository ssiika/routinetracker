import express, {Request, Response} from 'express';

const addTimeslot = (req: Request, res: Response) => {
        res.status(200).json({message: `Set timeslot ${req.params.id}`})
}

const getTimeslots = (req: Request, res: Response) => {
    res.status(200).json({message: `Get timeslot ${req.params.id}`})
}

const updateTimeslot = (req: Request, res: Response) => {
    res.status(200).json({message: `Update timeslot ${req.params.id}`})
}

const deleteTimeslot = (req: Request, res: Response) => {
    res.status(200).json({message: `Delete timeslot ${req.params.id}`})
}

module.exports = {
    addTimeslot,
    getTimeslots,
    updateTimeslot,
    deleteTimeslot
}