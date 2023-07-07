export {};
var express = require('express')
const router = express.Router()

const {
    addActivity,
    getActivities,
    updateActivity,
    deleteActivity,
} = require('../controllers/ActivityController')

router.route('/:id')
    .post(addActivity)
    .get(getActivities)
    .put(updateActivity)
    .delete(deleteActivity)
    
module.exports = router