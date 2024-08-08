const db = require("../db/connection.js");

const Articulos = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
                SELECT articulos.*, usuarios.nombre AS usuario_nombre
                FROM articulos
                LEFT JOIN usuarios ON articulos.usuario_id = usuarios.id
            `;
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },
  getById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
                SELECT articulos.*, usuarios.nombre AS usuario_nombre
                FROM articulos
                LEFT JOIN usuarios ON articulos.usuario_id = usuarios.id
                WHERE articulos.id = ?
            `;
      db.query(query, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0]);
        }
      });
    });
  },
  create: (articulo) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO articulos SET ?", articulo, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, ...articulo });
        }
      });
    });
  },
  update: (id, articulo) => {
    return new Promise((resolve, reject) => {
      const query = `UPDATE articulos SET numero_articulo = ?, nombre = ?, cantidad = ?, talle = ?,comentario = ?, pedidos_id = ?, usuario_id = ? WHERE id = ?`;
      db.query(
        query,
        [
          articulo.numero_articulo,
          articulo.nombre,
          articulo.cantidad,
          Atomics.talle,
          articulo.comentario,
          articulo.pedidos_id,
          articulo.usuario_id,
          id,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({ id, ...articulo });
          }
        }
      );
    });
  },
  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM articulos WHERE id = ?", [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = Articulos;
