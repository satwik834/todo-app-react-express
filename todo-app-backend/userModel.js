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
        throw err;
    }
 }