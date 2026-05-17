const express = require('express')

const router = express.Router()

const livrosRoutes =
  require('./livros')

const authRoutes =
  require('./auth')

const emprestimosRoutes =
  require('./emprestimos')

const usuariosRoutes =
  require('./usuarios')

/* ROTAS */

router.use(
  '/livros',
  livrosRoutes
)

router.use(
  '/auth',
  authRoutes
)

router.use(
  '/emprestimos',
  emprestimosRoutes
)

router.use(
  '/usuarios',
  usuariosRoutes
)

/* STATUS API */

router.get('/', (req, res) => {

  res.json({
    mensagem: '✅ API funcionando'
  })

})

module.exports = router