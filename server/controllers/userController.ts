const asyncHandler = require('express-async-handler');
import express, {Request, Response} from 'express';

const addUser = asyncHandler(async (req: Request, res: Response) => {
    if (!req.body.message) {
        res.status(400) 
        throw new Error('Please provide body message')
    }
        res.status(200).json(req.body.message)
})

const getUsers = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Get user ${req.params.id}`})
})

const updateUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Update user ${req.params.id}`})
})

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json({message: `Delete user ${req.params.id}`})
})

module.exports = {
    addUser,
    getUsers,
    updateUser,
    deleteUser
}