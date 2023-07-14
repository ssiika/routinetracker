var express = require('express')
const router = express.Router()

const {
    addTimeslot,
    getTimeslots,
    deleteTimeslot,
} = require('../controllers/timeslotController')
const { authenticate } = require('../middleware/tokenAuth')

router.route('/:id')
    .post(authenticate, addTimeslot)
    .get(authenticate, getTimeslots)
    .delete(authenticate, deleteTimeslot)

module.exports = router
export {};