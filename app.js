const express = require('express')
const app = express()
const port = 3004
const filmsRouter = require('./router/films')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorhandler')

app.use(cors({
    origin: process.env.FE_APP
}))


app.use(express.json())
app.use(express.static('public'))


app.get('/', (req, res) => {
    res.send('benvenuto nel databese')
})


app.use('/films', filmsRouter)




app.use(errorHandler)
app.use(notFound)


app.listen(port, () => {
    console.log(`sono in ascolto sulla porta ${port}`)
})

