const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    OPTIONS: {
        user: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOSTNAME,
        port: process.env.POSTGRES_PORT,
        database: process.env.DATABASE_NAME
    },
    GOOGLE_OPTION: {
        CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        REDIRECT_URI: process.env.REDIRECT_URI
    },
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    SESSION_SECRET:process.env.SESSION_SECRET
}