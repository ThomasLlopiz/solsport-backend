const Etapas = require("../models/etapasModel");
const Usuarios = require("../models/usuariosModel");
const Articulos = require("../models/articulosModel");
const Pedidos = require("../models/pedidosModel");
const { verifyToken } = require("../middlewares/authMiddleware");

exports.getAllEtapas = async (req, res) => {
  try {
    const etapas = await Etapas.getAll();
    res.json(etapas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEtapaById = async (req, res) => {
  try {
    const etapa = await Etapas.getById(req.params.id);
    if (etapa) {
      const usuario = await Usuarios.getById(etapa.usuario_id);
      const articulo = await Articulos.getById(etapa.articulos_id);
      const pedido = await Pedidos.getById(etapa.pedidos_id);
      res.json({
        ...etapa,
        usuario: usuario ? usuario.nombre : null,
        articulo: articulo ? articulo.nombre : null,
        pedido: pedido ? pedido.nombre_cliente : null,
      });
    } else {
      res.status(404).json({ message: "Etapa no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEtapa = async (req, res) => {
  try {
    const userId = req.user?.id || null;
    const { articulos_id, pedidos_id, ...rest } = req.body; // Destructuring to extract articulos_id and pedidos_id
    const nuevoEtapa = {
      ...rest,
      articulos_id,
      pedidos_id,
      usuario_id: userId,
    };
    const etapaCreado = await Etapas.create(nuevoEtapa);
    res.status(201).json(etapaCreado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEtapa = async (req, res) => {
  try {
    const usuarioId = req.user?.id;
    const { articulos_id, pedidos_id, ...rest } = req.body;
    const updatedEtapa = await Etapas.update(req.params.id, {
      ...rest,
      articulos_id,
      pedidos_id,
      usuario_id: usuarioId,
    });
    if (updatedEtapa) {
      res.json(updatedEtapa);
    } else {
      res.status(404).json({ message: "Etapa no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEtapa = async (req, res) => {
  try {
    const result = await Etapas.delete(req.params.id);
    if (result) {
      res.json({ message: "Etapa eliminada" });
    } else {
      res.status(404).json({ message: "Etapa no encontrada" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
