const express = require('express')
const app = express()
const port = 3004



app.use(express.json())

app.listen(port, () => {
    console.log(`sono in ascolto sulla porta ${port}`)
})

