const express = require('express')
const router = express.Router()
const controllerFilms = require('../controllers/controllerFilms')
const upload = require('../middleware/multer')




router.get('/', controllerFilms.index)

router.get('/:id', controllerFilms.show)

router.patch('/image', controllerFilms.patchNameImage)

router.patch('/slug', controllerFilms.patchslug)

router.post('/:id/reviews', controllerFilms.postReview)

router.post('/', upload.single('image'), controllerFilms.store)


module.exports = router