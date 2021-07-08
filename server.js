const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// middleware
app.use(express.json())

// use env.PORT in production, else 5000
const PORT = process.env.PORT || 5000

connectDB()

// homepage for dev
// app.get('/', (req, res) => {
//     res.json({ msg: 'welcome to contact keeper' })
// })

// Define Routes. Think of ea express.Router() class as a mini-app
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/contacts', require('./routes/contacts'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => res.sendFile(
        path.resolve(__dirname, 'client', 'build', 'index.html')
    ))
}

app.use(function (req, res, next) {
    console.log('@server.js: 404 error')
    res.status(404).send("404 ERROR. Sorry can't find that!")
})

app.listen(PORT, () => console.log(`@server.js: Server listening on port ${PORT}`))
