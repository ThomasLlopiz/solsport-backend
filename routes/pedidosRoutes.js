const express = require('express');
const router = express.Router();
const pedidosController = require('../controllers/pedidosController');
const { verifyToken, verifyAdminRole } = require('../middlewares/authMiddleware');

router.get('/', pedidosController.getAllPedidos);
router.get('/:id', pedidosController.getPedidoById);
router.post('/', verifyToken, verifyAdminRole, pedidosController.createPedido); 
router.put('/:id', verifyToken, verifyAdminRole, pedidosController.updatePedido); 
router.delete('/:id', verifyToken, verifyAdminRole, pedidosController.deletePedido); 

module.exports = router;
