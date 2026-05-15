const router = require('express').Router()

const controller = require('../controllers/livroController')

router.get('/', controller.listarLivros)

router.get('/:id', controller.buscarLivro)

router.post('/', controller.criarLivro)

router.put('/:id', controller.editarLivro)

router.delete('/:id', controller.excluirLivro)

module.exports = router