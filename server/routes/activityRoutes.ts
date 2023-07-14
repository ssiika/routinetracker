var express = require('express')
const router = express.Router()

const {
    addActivity,
    getActivities,
    deleteActivity,
} = require('../controllers/activityController')
const { authenticate } = require('../middleware/tokenAuth')

router.route('/')
    .get(authenticate, getActivities)
    .post(authenticate, addActivity)

router.route('/:id')
    .delete(authenticate, deleteActivity)
    
module.exports = router
export {};