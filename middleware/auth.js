/**
 * To access protected routes, the jwt must be attached to the req
 *   header. 
 * This middleware will check if the header contains a valid jwt and if so
 *   attach the .user object to the req
 */
const jwt = require('jsonwebtoken')
const config = require('config')

const msgs = {
    noToken: 'No token, authorization denied',
    badToken: 'Invalid login token',
}

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header('x-auth-token')
    if (!token) {
        return res.status(401).json({ msg: msgs.noToken })
    }

    try {
        // jwt.verify will throw err or decode token
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()  // this is requirement for middleware, calls next middleware
    } catch (err) {
        res.status(401).json({ msg: msgs.badToken })  // 401 = unauthorized
    }
}
