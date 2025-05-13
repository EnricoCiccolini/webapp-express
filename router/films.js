const express = require('express')
const router = express.Router()
const controllerFilms = require('../controllers/controllerFilms')





router.get('/', controllerFilms.index)

router.get('/:id', controllerFilms.show)

router.patch('/', controllerFilms.patch)

router.post('/:id/reviews', controllerFilms.postReview)



module.exports = router