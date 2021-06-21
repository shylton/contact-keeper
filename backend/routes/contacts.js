const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contact')

const msgs = {
    serverError: 'Server Error.'
}

// CRUD operations will be done here

/**
 * route:   GET api/contacts/
 * desc:    [READ] retrieve all user's contacts
 * access:  Private
 */
router.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact
            .find({ user: req.user.id })
            .sort({ date: -1 })

        res.json(contacts)
    } catch (err) {
        console.error(`@routes/contacts.js GET: ${err.message}`)
        res.status(500).send(msgs.serverError)
    }
})

/**
 * route:   POST api/contacts/
 * desc:    [CREATE] add a new contact
 * access:  Private
 */
router.post('/',
    [  // this is how you use multiple middlewares
        auth,
        [
            check('name', msgs.nameRequired).exists()
        ]
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const {name, email, phone, type} = req.body
        
        // allow duplicate contact submission?
        try {
            const newContact = new Contact({
                user: req.user.id,
                name,
                email,
                phone,
                type
            })
            const contact = await newContact.save()
            res.json(contact)  // SUCCESS
        } catch (err) {
            console.error(`@routes/contact.js POST: ${err.message}`)
            res.status(500).send(msgs.serverError)
        }
    })

/**
 * route:   PUT api/contacts/:id
 * desc:    Update contact
 * access:  Private
 */
router.put('/:id', (req, res) => {
    res.send('Update contact')
})

/**
 * route:   DELETE api/contacts/:id
 * desc:    delete contact
 * access:  Private
 */
router.delete('/:id', (req, res) => {
    res.send('Delete contact')
})

module.exports = router
