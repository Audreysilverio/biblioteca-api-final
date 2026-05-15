require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Mongo conectado'))
  .catch(err => console.log(err))

module.exports = app