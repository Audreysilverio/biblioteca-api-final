const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        erro: 'Token não informado'
      })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
      token,
      process.env.JWT_SECRET
    )

    next()

  } catch (error) {

    res.status(401).json({
      erro: 'Token inválido'
    })
  }
}