const db = require('../db/connection.js');

const Agregados = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM agregados', (err, results) => {
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
            db.query('SELECT * FROM agregados WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    create: (agregado) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO agregados SET ?', agregado, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: results.insertId, ...agregado });
                }
            });
        });
    },
    update: (id, agregado) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE agregados SET ? WHERE id = ?', [agregado, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, ...agregado });
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM agregados WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    }
};

module.exports = Agregados;
