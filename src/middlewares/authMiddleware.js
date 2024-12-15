// authMiddleware.js

const jwt = require('jsonwebtoken');  // Assuming you are using JWT for authentication

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token after 'Bearer '

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            }
            return res.status(403).json({ message: 'Invalid token', error: err.message });
        }

        req.user = decoded; // You can now access the decoded user info in the routes
        next();
    });
};

module.exports = authMiddleware;
