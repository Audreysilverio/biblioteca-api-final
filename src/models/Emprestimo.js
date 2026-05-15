const mongoose = require('mongoose')

const emprestimoSchema = new mongoose.Schema(

  {

    livro: {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'Livro',

      required: true
    },

    nomeLeitor: {

      type: String,

      required: true
    },

    devolvido: {

      type: Boolean,

      default: false
    },

    dataEmprestimo: {

      type: Date,

      default: Date.now
    },

    dataPrevistaDevolucao: {

      type: Date
    },

    dataDevolucao: {

      type: Date
    }

  },

  {

    timestamps: true
  }

)

module.exports = mongoose.model(
  'Emprestimo',
  emprestimoSchema
)