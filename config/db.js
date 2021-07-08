const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI') // uses ./default.json for dev and production.json for prod. Usually keys and dbs are different between those two files

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        })
        console.log('@config/db.js: mongoDB connected')
    } catch (err) {
        console.error('@config/db.js: connect fail=> ' + err.message)
        process.exit(1)
    }
}

module.exports = connectDB
