import passport from "passport";
import { Strategy } from "passport-local"; 
import bcrypt from 'bcrypt'
import * as userModel from "../models/userModel.js";

function initialize(passport){
    const authenticateUser = async (email,password,cb) => {
        const users = await userModel.getUserByEmail(email);
        const user = users[0]
        if(!user) return cb(null, false, {message : 'no user with that email'});

        try{
            if(await bcrypt.compare(password, user.password)) {
                return cb(null, user);
            }else{
                return cb(null,false, {message: 'incorrect password'});
            }
        }catch(err){
            return cb(err);
        }
    };
    passport.use(new Strategy({usernameField: 'email'}, authenticateUser))

 passport.serializeUser((user,cb) => {
 cb(null, user.id); // Store only the user ID
    });

 passport.deserializeUser(async (id, cb) => {
 try {
 const users = await userModel.getUserById(id); // Fetch the user by ID
 const user = users[0]
 if (user) {
 cb(null, user);
            } else {
 cb(new Error('User not found'), null);
            }
 } catch (err) {
 cb(err);
        }
    })
}

export default initialize
