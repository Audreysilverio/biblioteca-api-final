const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Usuario = require('../models/Usuario')

// REGISTER

exports.registrar = async (req, res) => {

  try {

    const {
      nome,
      email,
      senha,
      telefone
    } = req.body

    const usuarioExiste =
      await Usuario.findOne({ email })

    if (usuarioExiste) {

      return res.status(400).json({
        erro: 'Usuário já existe'
      })
    }

    const senhaHash =
      await bcrypt.hash(senha, 10)

    const usuario =
      await Usuario.create({

        nome,
        email,
        senha: senhaHash,
        telefone

      })

    res.status(201).json({

      mensagem:
        'Usuário criado com sucesso',

      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email
      }

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}

// LOGIN

exports.login = async (req, res) => {

  try {

    const {
      email,
      senha
    } = req.body

    const usuario =
      await Usuario.findOne({ email })

    if (!usuario) {

      return res.status(400).json({
        erro: 'Email ou senha inválidos'
      })
    }

    const senhaCorreta =
      await bcrypt.compare(
        senha,
        usuario.senha
      )

    if (!senhaCorreta) {

      return res.status(400).json({
        erro: 'Email ou senha inválidos'
      })
    }

    const token = jwt.sign(

      {
        id: usuario._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '7d'
      }

    )

    res.json({

      token,

      usuario: {

        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email

      }

    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}