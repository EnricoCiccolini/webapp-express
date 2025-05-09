const express = require('express')
const router = express.Router()
const controllerFilms = require('../controllers/controllerFilms')





router.get('/', controllerFilms.index)

router.get('/:id', controllerFilms.show)





module.exports = router