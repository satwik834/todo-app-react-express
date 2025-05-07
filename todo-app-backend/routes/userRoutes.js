import express from 'express';
import passport from 'passport';
import { createUser, logoutUser, loginUser } from '../controllers/userController.js';
import { isAuthenticated  } from '../middleware/auth.js';

const router = express.Router()


router.post('/register', createUser);
router.post('/login', loginUser);
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

export default router