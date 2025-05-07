import express from 'express';
import passport from 'passport';
import { createUser, logoutUser, loginUser } from '../controllers/userController.js';
import { isAuthenticated  } from '../middleware/auth.js';
import { validateRequest } from '../middleware/validateRequest.js';
import Joi from 'joi';

const router = express.Router();

const registerSchema = Joi.object({
    username: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

router.post('/register', validateRequest(registerSchema), createUser);
router.post('/login', validateRequest(loginSchema), loginUser);
router.post('/logout',isAuthenticated, logoutUser);

router.get("/me", isAuthenticated, (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const { password, ...userWithoutPassword } = req.user;
            res.json({ user: userWithoutPassword });
        } else {
            res.status(401).json({ error: 'Not authenticated' });
        }
    } catch (err) {
        console.error('Error in /me route:', err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;