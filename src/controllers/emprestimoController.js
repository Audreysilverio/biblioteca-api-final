const Emprestimo = require('../models/Emprestimo')

const Livro = require('../models/Livro')

// CRIAR EMPRÉSTIMO

exports.criarEmprestimo = async (
  req,
  res
) => {

  try {

    const {
      livroId,
      nomeLeitor
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

    const emprestimo =
      await Emprestimo.create({

        livro: livroId,

        nomeLeitor

      })

    livro.quantidadeDisponivel -= 1

    await livro.save()

    res.status(201).json(
      emprestimo
    )

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// LISTAR EMPRÉSTIMOS

exports.listarEmprestimos = async (
  req,
  res
) => {

  try {

    const emprestimos =
      await Emprestimo.find()

        .populate('livro')

        .sort({
          createdAt: -1
        })

    res.json(emprestimos)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// DEVOLVER LIVRO

exports.devolverLivro = async (
  req,
  res
) => {

  try {

    const emprestimo =
      await Emprestimo.findById(
        req.params.id
      ).populate('livro')

    if (!emprestimo) {

      return res.status(404).json({
        erro:
          'Empréstimo não encontrado'
      })
    }

    if (emprestimo.devolvido) {

      return res.status(400).json({
        erro:
          'Livro já devolvido'
      })
    }

    emprestimo.devolvido = true

    emprestimo.dataDevolucao =
      new Date()

    await emprestimo.save()

    const livro =
      await Livro.findById(
        emprestimo.livro._id
      )

    livro.quantidadeDisponivel += 1

    await livro.save()

    res.json({

      mensagem:
        'Livro devolvido com sucesso'

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}