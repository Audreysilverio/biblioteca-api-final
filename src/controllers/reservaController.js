const Reserva = require('../models/Reserva')

const Livro = require('../models/Livro')

// CRIAR RESERVA

exports.criarReserva = async (req, res) => {

  try {

    const {
      usuarioId,
      livroId
    } = req.body

    const livro =
      await Livro.findById(livroId)

    if (!livro) {

      return res.status(404).json({
        erro: 'Livro não encontrado'
      })
    }

    if (
      livro.quantidadeDisponivel <= 0
    ) {

      return res.status(400).json({
        erro: 'Livro indisponível'
      })
    }
const reservaExistente =
  await Reserva.findOne({

    usuarioId,

    livroId,

    status: {
      $in: [
        'reservado',
        'emprestado'
      ]
    }

  })

if (reservaExistente) {

  return res.status(400).json({

    erro:
      'Você já reservou este livro'

  })
}
    const reserva =
      await Reserva.create({

        usuarioId,
        livroId

      })

      livro.quantidadeDisponivel -= 1

await livro.save()

    res.status(201).json(reserva)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// LISTAR RESERVAS

exports.listarReservas = async (
  req,
  res
) => {

  try {

    const reservas =
      await Reserva.find()

        .populate('usuarioId')

        .populate('livroId')

    res.json(reservas)

  } catch (error) {

    console.log(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

exports.aprovarReserva = async (
  req,
  res
) => {

  try {

    const reserva =
      await Reserva.findById(
        req.params.id
      )

    if (!reserva) {

      return res.status(404).json({
        erro: 'Reserva não encontrada'
      })
    }

    reserva.status =
      'emprestado'

    await reserva.save()

    res.json({

      mensagem:
        'Reserva aprovada com sucesso'

    })

  } catch (error) {

    console.log(error)

    res.status(500).json({
      erro: error.message
    })
  }
}
