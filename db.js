import { Pool } from "pg";
import "dotenv/config";

const db = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl:{
        rejectUnauthorized: false
    }
});

export default db