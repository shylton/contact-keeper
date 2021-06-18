const express = require('express')
const connectDB = require('./config/db')

const app = express()

// middleware
app.use(express.json())

// use env.PORT in production, else 5000
const PORT = process.env.PORT || 5000

connectDB()

app.get('/', (req, res) => {
    res.json({ msg: 'welcome to contact keeper' })
})

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

app.use(function (req, res, next) {
    res.status(404).send("404 ERROR. Sorry can't find that!")
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
