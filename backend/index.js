const express = require('express')
const pool = require('./pool')

const { PORT, OPTIONS } = require('./config')


const app = express()

app.get('/', (req, res) => {
    res.send('WELCOME')
})

pool.connect(OPTIONS).then(() => {
    app.listen(PORT, () => {
        console.log(`SERVER STARTED IN PORT: ${PORT}`)
    })
})