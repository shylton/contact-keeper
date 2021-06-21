const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

const User = require('../models/User')
const Contact = require('../models/Contact')

const msgs = {
    serverError: 'Server Error.',
    badContact: 'Contact not found.',
    notAuthorized: 'Not authorized.',
    contactRm: 'Contact Removed',
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
    [  // use an array to pass multiple middlewares
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
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body

    // update only fields that were passed in by building below object
    const updateFields = {}
    if (name) updateFields.name = name
    if (email) updateFields.email = email
    if (phone) updateFields.phone = phone
    if (type) updateFields.type = type

    try {
        // req.params.id is the /:id passed in the route
        let contactToUpdate = await Contact.findById(req.params.id)
        if (!contactToUpdate) return res.status(404).json({ msg: msgs.badContact })

        // make sure user owns the contact!
        if (contactToUpdate.user.toString() !== req.user.id) {
            return res.status(401).send(msgs.notAuthorized)
        }

        // let mongoose do its magic
        contactToUpdate = await Contact.findByIdAndUpdate(
            req.params.id,
            {$set: updateFields},
            {new: true} // add field(s) if non existing
        )

        res.json(contactToUpdate)  // SUCCESS
    } catch (err) {
        console.error(`@routes/contact.js PUT: ${err.message}`)
        res.status(500).send(msgs.serverError)
    }
})

/**
 * route:   DELETE api/contacts/:id
 * desc:    delete contact
 * access:  Private
 */
router.delete('/:id', auth, async (req, res) => {
    try {
        // req.params.id is the /:id passed in the route
        let contactToUpdate = await Contact.findById(req.params.id)
        if (!contactToUpdate) return res.status(404).json({ msg: msgs.badContact })

        // make sure user owns the contact!
        if (contactToUpdate.user.toString() !== req.user.id) {
            return res.status(401).send(msgs.notAuthorized)
        }

        // let mongoose do its magic
        await Contact.findByIdAndRemove(req.params.id)

        res.json(msgs.contactRm)  // SUCCESS
    } catch (err) {
        console.error(`@routes/contact.js DELETE: ${err.message}`)
        res.status(500).send(msgs.serverError)
    }
})

module.exports = router
