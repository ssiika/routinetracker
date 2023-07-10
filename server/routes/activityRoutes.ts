var express = require('express')
const router = express.Router()

const {
    addActivity,
    getActivities,
    deleteActivity,
} = require('../controllers/activityController')

router.route('/:id')
    .post(addActivity)
    .get(getActivities)
    .delete(deleteActivity)
    
module.exports = router
export {};