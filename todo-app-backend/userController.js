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