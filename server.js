require('dotenv').config()
const express = require('express')
const methodOverride = require('method-override')
const app = express();

// Express Settings
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.json())

// Controllers and Routes
app.use('/books', require('./controllers/books-controller'))

// Home Page or root index Route
app.get('/', function (req, res) {
    res.send('Home Page here')
})

app.get('*', (req, res) => {
    res.render('error404')
})

// Listens for connection to port 3000
app.listen(process.env.PORT)