const connection = require('../db/connection');

const usuariosModel = {
  findByUsername: (username, callback) => {
    connection.query('SELECT * FROM usuarios WHERE nombre = ?', [username], callback);
  },
  getAll: (callback) => {
    connection.query('SELECT * FROM usuarios', callback);
  },
  getById: (id, callback) => {
    connection.query('SELECT * FROM usuarios WHERE id = ?', [id], callback);
  },
  create: (usuario, callback) => {
    connection.query('INSERT INTO usuarios SET ?', usuario, callback);
  },
  update: (id, usuario, callback) => {
    connection.query('UPDATE usuarios SET ? WHERE id = ?', [usuario, id], callback);
  },
  delete: (id, callback) => {
    connection.query('DELETE FROM usuarios WHERE id = ?', [id], callback);
  },
};

module.exports = usuariosModel;
