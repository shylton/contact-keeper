const express = require('express')
const router = express.Router()

// CRUD operations will be done here

/**
 * route:   GET api/contacts/
 * desc:    [READ] retrieve all user's contacts
 * access:  Private
 */
router.get('/', (req, res) => {
    res.send('list of contacts')
})

/**
 * route:   POST api/contacts/
 * desc:    [CREATE] add a new contact
 * access:  Private
 */
router.post('/', (req, res) => {
    res.send('Add a contact')
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
    res.send('Update contact')
})

module.exports = router
