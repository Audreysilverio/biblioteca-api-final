const Livro = require('../models/Livro')

// CREATE
exports.criarLivro = async (req, res) => {
  try {

    const quantidade = Number(req.body.quantidadeTotal) || 1

    const livro = await Livro.create({
      titulo: req.body.titulo,
      autor: req.body.autor,
      categoria: req.body.categoria,
      descricao: req.body.descricao,
      capa: req.body.capa,
      quantidadeTotal: quantidade,
      quantidadeDisponivel: quantidade
    })

    res.status(201).json(livro)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// READ ALL
exports.listarLivros = async (req, res) => {
  try {

    const livros = await Livro.find().sort({
      createdAt: -1
    })

    res.json(livros)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// READ ONE
exports.buscarLivro = async (req, res) => {
  try {

    const livro = await Livro.findById(req.params.id)

    if (!livro) {
      return res.status(404).json({
        erro: 'Livro não encontrado'
      })
    }

    res.json(livro)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// UPDATE
exports.editarLivro = async (req, res) => {
  try {

    const livro = await Livro.findByIdAndUpdate(
      req.params.id,
      {
        titulo: req.body.titulo,
        autor: req.body.autor,
        categoria: req.body.categoria,
        descricao: req.body.descricao,
        capa: req.body.capa,
        quantidadeTotal: req.body.quantidadeTotal,
        quantidadeDisponivel: req.body.quantidadeDisponivel
      },
      {
        new: true,
        runValidators: true
      }
    )

    if (!livro) {
      return res.status(404).json({
        erro: 'Livro não encontrado'
      })
    }

    res.json(livro)

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// DELETE
exports.excluirLivro = async (req, res) => {
  try {

    const livro = await Livro.findByIdAndDelete(req.params.id)

    if (!livro) {
      return res.status(404).json({
        erro: 'Livro não encontrado'
      })
    }

    res.json({
      mensagem: 'Livro excluído com sucesso'
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}