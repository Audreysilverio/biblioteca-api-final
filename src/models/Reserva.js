const mongoose = require('mongoose')

const reservaSchema = new mongoose.Schema(

  {

    usuarioId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'Usuario',

      required: true
    },

    livroId: {

      type: mongoose.Schema.Types.ObjectId,

      ref: 'Livro',

      required: true
    },

    status: {

      type: String,

      enum: [
        'reservado',
        'emprestado',
        'devolvido'
      ],

      default: 'reservado'
    },

    dataReserva: {

      type: Date,

      default: Date.now
    }

  },

  {
    timestamps: true
  }

)

module.exports = mongoose.model(
  'Reserva',
  reservaSchema
)