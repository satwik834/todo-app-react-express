import { createUser as create } from '../models/userModel.js';
import passport from 'passport';
import bcrypt from 'bcrypt';

const saltRounds = 10


export async function createUser(req,res){
    const { username, email, password } = req.body;
    console.log("hello from controller",username,email,password)

    try{
        const passwordHash = await bcrypt.hash(password,saltRounds);
        const result = await(create(username,email,passwordHash));
        console.log(result);
        res.status(201).json({message: 'user registered'});
    }catch(err){
        console.log(err.message)
        es.status(500).json({ error: err.message });
    }
}

export async function loginUser(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Login error:', err);
            return res.status(500).json({ error: err.message });
        }

        if (!user) {
            return res.status(401).json({ error: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('Session error:', err);
                return res.status(500).json({ error: 'Failed to create session' });
            }

            return res.json({
                message: 'Logged in successfully',
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        });
    })(req, res, next);
}

export function logoutUser(req, res) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not logged in' });
    }

    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
            return res.status(500).json({ error: 'Failed to logout' });
        }

        req.session.destroy((err) => {
            if (err) {
                console.error('Session destruction error:', err);
                return res.status(500).json({ error: 'Failed to destroy session' });
            }
            
            res.clearCookie('connect.sid');
            res.json({ message: 'Logged out successfully' });
        });
    });
}