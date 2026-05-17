require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

/* CORS */

app.use(cors({
  origin: '*',
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE'
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ]
}))

/* JSON */

app.use(express.json())

/* ROTAS */

app.use('/api', routes)

/* MONGODB */

mongoose.connect(process.env.MONGO_URI)

  .then(() => {

    console.log(
      '✅ MongoDB conectado'
    )

  })

  .catch((err) => {

    console.error(
      '❌ Erro MongoDB:',
      err
    )

  })

module.exports = app