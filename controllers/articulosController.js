const Articulos = require("../models/articulosModel");
const { verifyToken } = require("../middlewares/authMiddleware");

exports.getAllArticulos = async (req, res) => {
  try {
    const articulos = await Articulos.getAll();
    res.json(articulos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getArticuloById = async (req, res) => {
  try {
    const articulo = await Articulos.getById(req.params.id);
    if (articulo) {
      res.json(articulo);
    } else {
      res.status(404).json({ message: "Artículo no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createArticulo = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const pedidosId = req.pedidos?.id || null;
    const nuevoArticulo = {
      ...req.body,
      pedidos_id: pedidosId,
      usuario_id: userId,
    };
    const articuloCreado = await Articulos.create(nuevoArticulo);
    res.status(201).json(articuloCreado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticulo = async (req, res) => {
  try {
    const usuarioId = req.user?.id;
    const { pedidos_id, ...rest } = req.body;
    const updatedArticulo = await Articulos.update(req.params.id, {
      ...rest,
      pedidos_id,
      usuario_id: usuarioId,
    });
    if (updatedArticulo) {
      res.json(updatedArticulo);
    } else {
      res.status(404).json({ message: "Artículo no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteArticulo = async (req, res) => {
  try {
    const result = await Articulos.delete(req.params.id);
    if (result) {
      res.json({ message: "Artículo eliminado" });
    } else {
      res.status(404).json({ message: "Artículo no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
