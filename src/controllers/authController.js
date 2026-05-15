const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Admin = require('../models/Admin')

// REGISTER
exports.registrar = async (req, res) => {
  try {

    const { nome, email, senha } = req.body

    const adminExiste = await Admin.findOne({ email })

    if (adminExiste) {
      return res.status(400).json({
        erro: 'Admin já existe'
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    const admin = await Admin.create({
      nome,
      email,
      senha: senhaHash
    })

    res.status(201).json(admin)

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

    const { email, senha } = req.body

    const admin = await Admin.findOne({ email })

    if (!admin) {
      return res.status(400).json({
        erro: 'Email ou senha inválidos'
      })
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      admin.senha
    )

    if (!senhaCorreta) {
      return res.status(400).json({
        erro: 'Email ou senha inválidos'
      })
    }

    const token = jwt.sign(
      {
        id: admin._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '7d'
      }
    )

    res.json({
      token,
      admin: {
        id: admin._id,
        nome: admin.nome,
        email: admin.email
      }
    })

  } catch (error) {

    console.error(error)

    res.status(500).json({
      erro: error.message
    })
  }
}