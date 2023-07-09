const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
import express, {Request, Response} from 'express';

const addUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password ) {
        res.status(400)
        throw new Error('Please provide a username and password');
    }

    const userAlreadyExists = await User.findOne({username});

    if (userAlreadyExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // Temporary pw
    const hashedPw = password

    /* Hash password 
    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt); */

    const user = await User.create({
        username,
        password: hashedPw
    })

    if (!user) {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.status(200).json(user)
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