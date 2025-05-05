const pool = require('./pool')

const { OPTIONS } = require('./config')


async function init() {
    try {
        await pool.connect(OPTIONS)

        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await pool.query(`
            CREATE TABLE IF NOT EXIST users(
                id TEXT PRIMARY KEY DEFAULT uuid_generate_v1(),
                user_name VARCHAR NOT NULL,
                user_email TEXT NOT NULL UNIQUE,
                user_profile_image TEXT
            );
        `)
        

        console.log("Tables created successfully.");
    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        await pool.close();
    }
}

init();