var express = require('express')
const router = express.Router()

const {
    addRecord,
    getRecords,
    updateRecord,
    deleteRecord,
} = require('../controllers/recordController')

router.route('/:id')
    .post(addRecord)
    .get(getRecords)
    .put(updateRecord)
    .delete(deleteRecord)
    
module.exports = router
export {};