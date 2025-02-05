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
    const { agregados, ...rest } = req.body;
    const agregadosStr = agregados ? agregados.join(", ") : "";
    const nuevoArticulo = {
      ...rest,
      agregados: agregadosStr,
      usuario_id: userId,
    };
    const articuloCreado = await Articulos.create(nuevoArticulo);
    res.status(201).json(articuloCreado);
  } catch (err) {
    console.error("Error al crear el artículo:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateArticulo = async (req, res) => {
  try {
    const usuarioId = req.user?.id; // Obtener el usuario actual
    const { agregados, pedidos_id, ...rest } = req.body; // Extraer 'agregados' y el resto
    const agregadosStr = agregados ? agregados.join(", ") : ""; // Convertir 'agregados' en una cadena

    const updatedArticulo = await Articulos.update(req.params.id, {
      ...rest, // El resto de los datos que vienen en la petición
      agregados: agregadosStr, // Asignar la cadena 'agregados'
      pedidos_id, // Mantener el ID de pedidos
      usuario_id: usuarioId, // Asignar el id del usuario
    });

    if (updatedArticulo) {
      res.json(updatedArticulo); // Responder con el artículo actualizado
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
