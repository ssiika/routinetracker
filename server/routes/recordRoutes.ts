var express = require('express')
const router = express.Router()

const {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord,
} = require('../controllers/recordController')
const { authenticate } = require('../middleware/tokenAuth')

router.route('/').post(authenticate, addRecord)

router.route('/:id')
    .get(authenticate, getRecords)
    .put(authenticate, updateRecord)
    .delete(authenticate, deleteRecord)
    
module.exports = router
export {};