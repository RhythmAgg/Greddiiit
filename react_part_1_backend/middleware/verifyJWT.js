const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization


    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorizedhh' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.userName = decoded.UserInfo.userName
            req.user_id = decoded.UserInfo.user_id
            console.log('done')
            next()
        }
    )
}

module.exports = verifyJWT 