var express = require('express')
const router = express.Router()

const {
    addTimeslot,
    getTimeslots,
    updateTimeslot,
    deleteTimeslot,
} = require('../controllers/timeslotController')

router.route('/:id')
    .post(addTimeslot)
    .get(getTimeslots)
    .put(updateTimeslot)
    .delete(deleteTimeslot)

module.exports = router
export {};