require('dotenv').config()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI)

// Future export models can be placed below this comment
module.exports.Book = require('./books')