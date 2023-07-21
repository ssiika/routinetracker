var express = require('express')
const router = express.Router()

const {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord,
} = require('../controllers/recordController')
const { authenticate } = require('../middleware/tokenAuth')

router.route('/')
    .post(authenticate, addRecord)
    .get(authenticate, getRecords)

router.route('/:id')
    .put(authenticate, updateRecord)
    .delete(authenticate, deleteRecord)
    
module.exports = router
export {};