import pkg from 'pg';
const { Client } = pkg;


const db = new Client({
    host:"localhost",
    user:"postgres",
    port:"5432",
    password:"234856",
    database:"todo"
})

await db.connect();
console.log("database connection successful");

export default db;