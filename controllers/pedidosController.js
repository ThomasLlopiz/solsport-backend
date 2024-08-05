const Pedidos = require('../models/pedidosModel');
const { verifyToken } = require('../middlewares/authMiddleware'); 

exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedidos.getAll();
        res.json(pedidos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedidos.getById(req.params.id);
        if (pedido) {
            res.json(pedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createPedido = async (req, res) => {
    try {
        const userId = req.user.id;
        const nuevoPedido = { ...req.body, usuario_id: userId };
        const pedidoCreado = await Pedidos.create(nuevoPedido);
        res.status(201).json(pedidoCreado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updatePedido = async (req, res) => {
    try {
        const updatedPedido = await Pedidos.update(req.params.id, req.body);
        if (updatedPedido) {
            res.json(updatedPedido);
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deletePedido = async (req, res) => {
    try {
        const result = await Pedidos.delete(req.params.id);
        if (result) {
            res.json({ message: 'Pedido eliminado' });
        } else {
            res.status(404).json({ message: 'Pedido no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
