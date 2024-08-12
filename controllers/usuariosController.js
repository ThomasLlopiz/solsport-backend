const usuariosModel = require("../models/usuariosModel");
const jwt = require('jsonwebtoken');

const usuariosController = {
  login: (req, res) => {
    const { username, password } = req.body;
    usuariosModel.findByUsername(username, (err, results) => {
      if (err) {
        return res.status(500).send("Error en la base de datos");
      }
      if (results.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "Usuario no encontrado" });
      }
      const user = results[0];
      if (user.contrasena !== password) {
        return res
          .status(401)
          .json({ success: false, message: "Contraseña incorrecta" });
      }
      const token = jwt.sign(
        { id: user.id, rol: user.rol },
        "dGhpcyBpcyBhIHZlcnkgc2VjdXJlIGZvcndhcmQgdGhpcyBpc29uZ2x5IG1lZGlhdGlvbiB0aGF0IGlzIGNoYW5nZWQgdGhpcyBhcHByb3ZhbGx5IGxvbmcgYXQgbm9pZCBwcm9ibGVtcy4gU2VjdXJlIHZhbHVlIGlzIG1vcmUgd2l0aCBhbGdvcml0aG0",
        { expiresIn: "8h" }
      );
      res.json({ success: true, message: "Inicio de sesión exitoso", token });
    });
  },
  getAll: (req, res) => {
    usuariosModel.getAll((err, results) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(results);
      }
    });
  },
  getById: (req, res) => {
    const { id } = req.params;
    usuariosModel.getById(id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(result);
      }
    });
  },
  create: (req, res) => {
    const usuario = req.body;
    usuariosModel.create(usuario, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id: result.insertId, ...usuario });
      }
    });
  },
  update: (req, res) => {
    const { id } = req.params;
    const usuario = req.body;
    usuariosModel.update(id, usuario, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ id, ...usuario });
      }
    });
  },
  delete: (req, res) => {
    const { id } = req.params;
    usuariosModel.delete(id, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ message: "Usuario eliminado" });
      }
    });
  },
};

module.exports = usuariosController;
