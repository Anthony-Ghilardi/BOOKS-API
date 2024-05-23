const router = require('express').Router()
const db = require('../models')

// Seed route for book data
router.get('/seed', (req, res) => {
    db.Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "Wâˆ€RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(() => res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(() => res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

// Index GET Route to find all books
router.get('/', (req, res) => {
    db.Book.find()
        .then((books) => {
            res.json(books)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: 'Error fetching books' })
        })
})

// Show route for an individual book by its ID
router.get('/:id', (req, res) => {
    db.Book.findById(req.params.id)
        .then((book) => {
            if (!book) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.json(book)
        })
        .catch(err => {
            console.log(err)
            res.status(404).json({ error: 'Error fetching book' })
        })
})

// Update a book PUT route
router.put('/:id', (req, res) => {
    db.Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.json(book)
        })
        .catch(err => {
            console.log('err', err)
            res.status(404).json({ error: 'Error updating book' })
        })
})

// Create a new book 
router.post('/', (req, res) => {
    db.Book.create(req.body)
        .then((book) => {
            res.json(book)
        })
        .catch(err => {
            console.log('err', err)
            res.status(404).json({ error: 'Error creating book' })
        })
})

// Delete route
router.delete('/:id', (req, res) => {
    db.Book.findByIdAndDelete(req.params.id)
        .then((book) => {
            if (!book) {
                return res.status(404).json({ error: 'Book not found' })
            }
            res.json({ message: 'Book deleted successfully', book })
        })
        .catch(err => {
            console.log('err', err)
            res.status(404).json({ error: 'Error deleting book' })
        })
})

module.exports = router