const usuariosModel = require("../models/usuariosModel");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(
    token,
    "dGhpcyBpcyBhIHZlcnkgc2VjdXJlIGZvcndhcmQgdGhpcyBpc29uZ2x5IG1lZGlhdGlvbiB0aGF0IGlzIGNoYW5nZWQgdGhpcyBhcHByb3ZhbGx5IGxvbmcgYXQgbm9pZCBwcm9ibGVtcy4gU2VjdXJlIHZhbHVlIGlzIG1vcmUgd2l0aCBhbGdvcml0aG0",
    (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token inválido" });
      }

      req.user = decoded;
      next();
    }
  );
};

const verifyAdminRole = (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: "Usuario no autenticado" });
  }

  usuariosModel.getById(userId, (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Error al buscar usuario" });
    }
    if (!results.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const user = results[0];
    if (user.rol !== "admin") {
      return res.status(403).json({ message: "Acceso denegado" });
    }
    next();
  });
};

module.exports = { verifyToken, verifyAdminRole };
