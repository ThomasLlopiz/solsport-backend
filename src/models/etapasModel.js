const db = require("../db/connection.js");

const Etapas = {
  getAll: () => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT etapas.*, usuarios.nombre AS usuario_nombre
        FROM etapas
        LEFT JOIN usuarios ON etapas.usuario_id = usuarios.id
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
        SELECT etapas.*, usuarios.nombre AS usuario_nombre
        FROM etapas
        LEFT JOIN usuarios ON etapas.usuario_id = usuarios.id
        WHERE etapas.id = ?
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

  create: (etapa) => {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO etapas SET ?", etapa, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve({ id: results.insertId, ...etapa });
        }
      });
    });
  },

  update: (id, etapa) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE etapas
        SET nombre = ?, fecha_inicio = ?, fecha_fin = ?, articulos_id = ?, pedidos_id = ?, usuario_id = ?
        WHERE id = ?
      `;
      db.query(
        query,
        [
          etapa.nombre,
          etapa.fecha_inicio,
          etapa.fecha_fin,
          etapa.articulos_id,
          etapa.pedidos_id,
          etapa.usuario_id,
          id,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve({ id, ...etapa });
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM etapas WHERE id = ?", [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results.affectedRows > 0);
        }
      });
    });
  },
};

module.exports = Etapas;
