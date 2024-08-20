const Telas = require('../models/telasModel');
const { verifyToken } = require('../middlewares/authMiddleware'); 

exports.getAllTelas = async (req, res) => {
    try {
        const telas = await Telas.getAll();
        res.json(telas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getTelaById = async (req, res) => {
    try {
        const tela = await Telas.getById(req.params.id);
        if (tela) {
            res.json(tela);
        } else {
            res.status(404).json({ message: 'Tela no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createTela = async (req, res) => {
    try {
        const newTela = req.body; // No necesitas agregar usuario_id aquí a menos que tu modelo lo requiera
        const telaCreada = await Telas.create(newTela);
        res.status(201).json(telaCreada);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateTela = async (req, res) => {
    try {
        const updatedTela = await Telas.update(req.params.id, req.body);
        if (updatedTela) {
            res.json(updatedTela);
        } else {
            res.status(404).json({ message: 'Tela no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteTela = async (req, res) => {
    try {
        const result = await Telas.delete(req.params.id);
        if (result) {
            res.json({ message: 'Tela eliminada' });
        } else {
            res.status(404).json({ message: 'Tela no encontrada' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
