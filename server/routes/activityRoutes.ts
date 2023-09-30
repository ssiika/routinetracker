var express = require('express')
const router = express.Router()

const {
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity,
} = require('../controllers/activityController')
const { authenticate } = require('../middleware/tokenAuth')

router.route('/')
    .get(authenticate, getActivities)
    .post(authenticate, addActivity)

router.route('/:id')
    .put(authenticate, updateActivity)
    .delete(authenticate, deleteActivity)
    
module.exports = router
export {};