var express = require('express')
const router = express.Router()

const {
    addUser,
    getUser,
    updateUser,
    deleteUser,
} = require('../controllers/userController')

router.route('/:id')
    .post(addUser)
    .get(getUser)

module.exports = router
export {};