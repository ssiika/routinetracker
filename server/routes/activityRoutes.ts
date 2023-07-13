var express = require('express')
const router = express.Router()

const {
    addActivity,
    getActivities,
    deleteActivity,
} = require('../controllers/activityController')

router.route('/').post(addActivity)

router.route('/:id')
    .get(getActivities)
    .delete(deleteActivity)
    
module.exports = router
export {};