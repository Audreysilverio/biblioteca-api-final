const express = require('express')

const router = express.Router()

const reservaController =
  require('../controllers/reservaController')

// CRIAR RESERVA

router.post(
  '/',
  reservaController.criarReserva
)

// LISTAR RESERVAS

router.get(
  '/',
  reservaController.listarReservas
)

router.put(
  '/aprovar/:id',
  reservaController.aprovarReserva
)

module.exports = router