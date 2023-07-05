export {};
const express = require('express')
const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
    res.status(200).json({message: 'Get timeslot'})
})