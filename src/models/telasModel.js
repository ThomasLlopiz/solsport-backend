const db = require('../db/connection.js');

const Telas = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM telas', (err, results) => {
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
            db.query('SELECT * FROM telas WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]);
                }
            });
        });
    },
    create: (tela) => {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO telas SET ?', tela, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: results.insertId, ...tela });
                }
            });
        });
    },
    update: (id, tela) => {
        return new Promise((resolve, reject) => {
            db.query('UPDATE telas SET ? WHERE id = ?', [tela, id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id, ...tela });
                }
            });
        });
    },
    delete: (id) => {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM telas WHERE id = ?', [id], (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results.affectedRows > 0);
                }
            });
        });
    }
};

module.exports = Telas;
