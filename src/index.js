const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const app = express()
const callback = require('./callback-adapters').express({ apiVersion: 'express-0.0.1' }).callback

app.get('/', (req, res) => res.send({ ok: 'root' }))
app.get('/ping', (req, res) => res.send({ ok: 'pong' }))

app.get('/mycontroller', callback(myController))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))

async function myController (httpRequest) {
    console.log(httpRequest)
    return {
        statusCode: 200,
        body: {
            ok: 'sip'
        }
    }
}
