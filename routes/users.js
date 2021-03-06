// this route is used to register a new user to the database

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const { check, validationResult } = require('express-validator')

const msgs = {
    blankName: 'Please add a name',
    badEmail: 'Please include a valid email',
    shortPsw: 'Please enter a password with 6 or more characters',
    userExists: 'ERROR: user already exists. Please use a different email',
}

/**
 * route:   POST api/users
 * desc:    Register a user
 * access:  Public
 */
router.post(
    '/',
    // list of express-validator checks goes in the second param of router
    [
        check('name', msgs.blankName).not().isEmpty(),
        check('email', msgs.badEmail).isEmail(),
        check('password', msgs.shortPsw).isLength({ min: 6 },)
    ],
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array()[0])  // deal w one at a time. format => { "msg": string }
        }

        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email }) // ES6: same as {email:email}

            // ERROR: user already exits
            if (user) return res.status(400).json({ msg: msgs.userExists })

            user = new User({
                name, // ES6: same as {name:name, ...}
                email,
                password
            })

            // SALT and HASH password
            // refactor: bcrypt throw err?
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)
            await user.save()

            // send JWT token
            jwt.sign(
                { user: { id: user.id } },     // payload
                config.get('jwtSecret'),        // my secret key
                { expiresIn: 360000 },         // options
                (err, token) => {              // callback function
                    if (err) throw err
                    res.json({ token })
                }
            )
        } catch (err) {
            console.error(`@users.js fail: ${err.message}`)
            res.status(500).send('Server Error') // status 500 = server error
        }
    }
)

module.exports = router
