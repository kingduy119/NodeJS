const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.Authorization.split(' ')[1];
    console.log(token);
    try {
        const decoded = jwt.verify(token, 'secret')
        req.userData = decoded;
        next();
     } catch {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
}