const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

router.post('/backend/login', usuariosController.login);
router.get('/backend/', usuariosController.getAll);
router.get('/backend/:id', usuariosController.getById);
router.post('/backend/', usuariosController.create);
router.put('/backend/:id', usuariosController.update);
router.delete('/backend/:id', usuariosController.delete);

module.exports = router;
