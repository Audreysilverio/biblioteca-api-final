const router = require('express').Router()

const controller = require('../controllers/emprestimoController')

const auth = require('../middlewares/auth')

router.get('/', auth, controller.listarEmprestimos)

router.post('/', auth, controller.criarEmprestimo)

router.put(
  '/devolver/:id',
  auth,
  controller.devolverLivro
)

module.exports = router