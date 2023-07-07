import express, {Request, Response} from 'express';

const addUser = (req: Request, res: Response) => {
        res.status(200).json({message: `Set user ${req.params.id}`})
}

const getUsers = (req: Request, res: Response) => {
    res.status(200).json({message: `Get user ${req.params.id}`})
}

const updateUser = (req: Request, res: Response) => {
    res.status(200).json({message: `Update user ${req.params.id}`})
}

const deleteUser = (req: Request, res: Response) => {
    res.status(200).json({message: `Delete user ${req.params.id}`})
}

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}