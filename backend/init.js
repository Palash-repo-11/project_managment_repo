const pool = require('./pool')

const { OPTIONS } = require('./config')


async function init() {
    try {
        await pool.connect(OPTIONS)

        await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await pool.query(`
                CREATE TABLE IF NOT EXISTS "session" (
                "sid" varchar PRIMARY KEY NOT NULL,
                "sess" json NOT NULL,
                "expire" timestamp(6) NOT NULL
                )
                WITH (OIDS=FALSE);
                
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM pg_constraint WHERE conname = 'session_pkey'
                    ) THEN
                        ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid");
                    END IF;
                END $$;
                
                DO $$
                BEGIN
                    IF NOT EXISTS (
                        SELECT 1 FROM pg_indexes WHERE indexname = 'IDX_session_expire'
                    ) THEN
                        CREATE INDEX "IDX_session_expire" ON "session" ("expire");
                    END IF;
                END $$;
        `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
                id TEXT PRIMARY KEY DEFAULT uuid_generate_v1(),
                google_id TEXT,
                user_name VARCHAR NOT NULL,
                user_email TEXT NOT NULL UNIQUE,
                user_profile_image TEXT
            );
        `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS organization(
                id TEXT PRIMARY KEY DEFAULT uuid_generate_v1(),
                oragization_name  TEXT UNIQUE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                owner_id 
            )
        `)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS role(
                user_id TEXT,
                type TEXT,
                organization_id TEXT,
                FOREIGN KEY(user_id)
                REFERENCES users(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE,
                FOREIGN KEY(organization_id)
                REFERENCES organization(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
            )
        `)

        await pool.query(`
            
        `)


        console.log("Tables created successfully.");
    } catch (err) {
        console.error("Error initializing database:", err);
    } finally {
        await pool.close();
    }
}

init();