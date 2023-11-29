const jwt = require('jsonwebtoken');
const { USERFRONT_PUBLIC_KEY } = require('../settings/environment');

const Auth = {
    authenticateToken: async (req, res, next) => {
        const authHeader = req.headers.authorization;

        // Authorization: Bearer token
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: 'Invalid token.'
            });
        }

        try {
            const auth = jwt.verify(token, USERFRONT_PUBLIC_KEY);
            req.auth = auth;
            next();
        } catch (err) {
            return res.status(401).json({
                message: 'Invalid token.',
                error: err
            });
        }
    }
}

module.exports = Auth;