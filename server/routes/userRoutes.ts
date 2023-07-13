var express = require('express')
const router = express.Router()

const {
    addUser,
    loginUser,
    getUser,
} = require('../controllers/userController')
const { authenticate } = require('../middleware/tokenAuth')

router.route('/login')
    .post(loginUser)

router.route('/')
    .post(addUser)

router.route('/:id')
    .get(authenticate, getUser)


module.exports = router
export {};