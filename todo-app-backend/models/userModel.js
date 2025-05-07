 
 import db from "../database.js";


 export async function createUser(username,email,passwordHash){
    try{
        const res = await db.query(
            `INSERT INTO users(username,email,password)
             VALUES($1,$2,$3) RETURNING id,username,email
             `,
            [username, email, passwordHash]            
        );
        return res.rows[0];
    }catch(err){
        console.log("error while creating user",err.message);
    }
 }

 //get by email

 export async function getUserByEmail(email){
    try{
        const res = await db.query(
            `SELECT * FROM users WHERE email = $1`,[email]
        );
        return res.rows
    }catch(err){
        console.log("error while getting user by email",err.message)
    }
 }
 //get by id
 export async function getUserById(id){
    try{
        const res = await db.query(
            `SELECT * FROM users WHERE id = $1`,[id]
        );
        return res.rows
    }catch(err){
        console.log("error while getting user by id",err.message)
    }
 }
 //get all users
 export async function getAllUsers() {
    try {
        const res = await db.query(`SELECT * FROM users`);
        return res.rows;
    } catch (err) {
        console.error("Error in getAllUsers:", err.message);
        throw err;
    }
}

