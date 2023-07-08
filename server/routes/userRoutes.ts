var express = require('express')
const router = express.Router()

const {
    addUser,
    getUsers,
    updateUser,
    deleteUser,
} = require('../controllers/userController')

router.route('/:id')
    .post(addUser)
    .get(getUsers)
    .put(updateUser)
    .delete(deleteUser)

module.exports = router
export {};