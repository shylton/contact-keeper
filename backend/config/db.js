const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI') // uses ./default.json

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('mongoDB connected')
    } catch (err) {
        console.error('db connect fail: ' + err.message)
        process.exit(1)
    }
}

module.exports = connectDB
