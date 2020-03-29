const jwt = require("jsonwebtoken")

function auth() {
    const authError = {
        message: "Need to Sign Up or Login"
    }

    return async (req, res, next) => {
        try {
            const { token } = req.cookies
            
            if(!token) {
                return res.status(401).json(authError)
            }
            jwt.verify(token, process.env.JWT_SECRET || 'whale', (err, decoded) => {
                if(err) {
                    return res.status(401).json(authError)
                }
                req.token = decoded
                next()
            })

        } catch (err) {
            next(err)
        }
    }
}

module.exports = auth