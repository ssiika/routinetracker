var express = require('express')
const router = express.Router()

const {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord,
} = require('../controllers/recordController')

router.route('/').post(addRecord)

router.route('/:id')
    .get(getRecords)
    .put(updateRecord)
    .delete(deleteRecord)
    
module.exports = router
export {};