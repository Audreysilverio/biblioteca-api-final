const mongoose = require('mongoose')

const LivroSchema = new mongoose.Schema({

  titulo: {
    type: String,
    required: true
  },

  autor: {
    type: String,
    required: true
  },

  categoria: {
    type: String
  },

  descricao: {
    type: String
  },

  capa: {
    type: String
  },

  quantidadeTotal: {
    type: Number,
    default: 1
  },

  quantidadeDisponivel: {
    type: Number,
    default: 1
  }

}, {
  timestamps: true
})

module.exports =
  mongoose.model(
    'Livro',
    LivroSchema
  )
  