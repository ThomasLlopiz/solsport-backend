const express = require('express');
const router = express.Router();
const telasController = require('../controllers/telasController');
const { verifyToken, verifyAdminRole } = require('../middlewares/authMiddleware');

router.get('/', telasController.getAllTelas);
router.get('/:id', telasController.getTelaById);
router.post('/', verifyToken, verifyAdminRole, telasController.createTela); 
router.put('/:id', verifyToken, verifyAdminRole, telasController.updateTela); 
router.delete('/:id', verifyToken, verifyAdminRole, telasController.deleteTela); 

module.exports = router;
