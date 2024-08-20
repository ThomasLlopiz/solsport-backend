const Agregados = require('../models/agregadosModel');
const { verifyToken } = require('../middlewares/authMiddleware');

exports.getAllAgregados = async (req, res) => {
    try {
        const agregados = await Agregados.getAll();
        res.json(agregados);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAgregadoById = async (req, res) => {
    try {
        const agregado = await Agregados.getById(req.params.id);
        if (agregado) {
            res.json(agregado);
        } else {
            res.status(404).json({ message: 'Agregado no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAgregado = async (req, res) => {
    try {
        const newAgregado = req.body; // No necesitas agregar usuario_id aquí a menos que tu modelo lo requiera
        const agregadoCreado = await Agregados.create(newAgregado);
        res.status(201).json(agregadoCreado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAgregado = async (req, res) => {
    try {
        const updatedAgregado = await Agregados.update(req.params.id, req.body);
        if (updatedAgregado) {
            res.json(updatedAgregado);
        } else {
            res.status(404).json({ message: 'Agregado no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAgregado = async (req, res) => {
    try {
        const result = await Agregados.delete(req.params.id);
        if (result) {
            res.json({ message: 'Agregado eliminado' });
        } else {
            res.status(404).json({ message: 'Agregado no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
