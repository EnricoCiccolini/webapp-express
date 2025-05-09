const express = require('express')
const app = express()
const port = 3004
const filmsRouter = require('./router/films')



app.use(express.json())


app.use('/films', filmsRouter)

app.listen(port, () => {
    console.log(`sono in ascolto sulla porta ${port}`)
})

