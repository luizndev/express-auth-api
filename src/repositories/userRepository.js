const db = require('../db/db');

const PUBLIC_FIELDS = 'id, name, email, role';

async function create(user) {
    const result = await db.run(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [user.name, user.email, user.password]
    );

    return findById(result.lastID);
}

function findByEmail(email) {
    return db.get('SELECT * FROM users WHERE email = ?', [email]);
}

function findById(id) {
    return db.get(`SELECT ${PUBLIC_FIELDS} FROM users WHERE id = ?`, [id]);
}

module.exports = {
    create,
    findByEmail,
    findById,
};
