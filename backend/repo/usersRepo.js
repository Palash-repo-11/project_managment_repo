

const pool = require('../pool')
const toCamelCase = require('./utils/toCamelCase')

class users {
    static async insertUser(google_id, user_email, user_name, user_profile_image) {
        const { rows } = await pool.query(`
           INSERT INTO users (google_id, user_email, user_name, user_profile_image) VALUES ($1, $2, $3, $4) RETURNING *;
        `, [google_id, user_email, user_name, user_profile_image])
        return toCamelCase(rows)[0]
    }
    static async findByEmail(email) {
        const { rows } = await pool.query(`
            SELECT * FROM users WHERE user_email=$1;
        `, [email])
        return toCamelCase(rows)[0]
    }
    static async findById(id) {
        const { rows } = await pool.query(`
            SELECT * FROM users WHERE id=$1;
        `, [id])
        return toCamelCase(rows)[0]
    }
}


module.exports = {
    users
}