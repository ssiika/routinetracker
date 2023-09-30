const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
import express, {Request, Response} from 'express';
import { RequestWUser } from '../types';

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

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt); 

    const user = await User.create({
        username,
        password: hashedPw
    })

    if (!user) {
        res.status(400)
        throw new Error('Invalid user data')
    }

    res.status(200).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
    })
})

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const {username, password} = req.body

    const user = await User.findOne({username})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getUser = asyncHandler(async (req: RequestWUser, res: Response) => {
    const { _id, username } = await User.findById(req.user._id)

    res.status(200).json({
        id: _id,
        username
    })
})

const generateToken = (userId: String) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET)
}



module.exports = {
    addUser,
    loginUser,
    getUser,
    generateToken
}