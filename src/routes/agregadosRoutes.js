const express = require('express');
const router = express.Router();
const agregadosController = require('../controllers/agregadosController');
const { verifyToken, verifyAdminRole } = require('../middlewares/authMiddleware');

router.get('/', agregadosController.getAllAgregados);
router.get('/:id', agregadosController.getAgregadoById);
router.post('/', verifyToken, verifyAdminRole, agregadosController.createAgregado);
router.put('/:id', verifyToken, verifyAdminRole, agregadosController.updateAgregado);
router.delete('/:id', verifyToken, verifyAdminRole, agregadosController.deleteAgregado);

module.exports = router;
