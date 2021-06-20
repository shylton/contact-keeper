// login route

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

const msgs = {
    badEmail: 'Please include a valid email',
    noPsw: 'Please enter your password',
    badPsw: 'Password does not match',
    usrNotFound: 'Error: Cannot find this email on our user database',
}

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
 * desc:    Auth (login) user and get token
 * access:  Public (open entry point to get token)
 */
router.post('/', 
[
    check('email', msgs.badEmail).isEmail(),
    check('password', msgs.noPsw).exists()
],
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const {email, password} = req.body

    try {
        // 1. retrieve the user from the database
        let user = await User.findOne({email})
        if (!user) {
            return res.status(400).json({msg: msgs.usrNotFound})
        }

        // 2. see if passord matches
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({msg: msgs.badPsw})
        }

        // 3. User authorized, send JWT
        const payload = {
            user: {id:user.id}
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err
                // SUCCESS! 
                res.json({token})
            }
        )
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

module.exports = router
