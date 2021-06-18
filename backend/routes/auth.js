const express = require('express')
const router = express.Router()

/**
 * route:   GET api/auth
 * desc:    Get logged in user
 * access:  Private
 */
router.get('/', (req, res) => {
    res.send('get logged in user')
})

/**
 * route:   POST api/auth
 * desc:    Auth user and get token
 * access:  Public (open entry point to get token)
 */
router.post('/', (req, res) => {
    res.send('Try to log in user')
})

module.exports = router
