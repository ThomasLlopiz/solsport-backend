const db = require('../db/connection.js');

const Pedidos = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM pedidos', (err, results) => {
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
            db.query('SELECT * FROM pedidos WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    create: (pedido) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO pedidos SET ?', pedido, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: results.insertId, ...pedido });
                }
            });
        });
    },
    update: (id, pedido) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE pedidos SET ? WHERE id = ?', [pedido, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, ...pedido });
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM pedidos WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    }
};

module.exports = Pedidos;
