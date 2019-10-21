// check if user is logged in before granting access to next middleware/route handler
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

module.exports = (req, res, next) => {
  const token = req.headers.authorization // tokens transferred in auth header

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: 'token not verified' });
      } else {
        // token is good, set username (and/or other props) to request object
        req.user = {
          username: decodedToken.username
        }
        next()
      }
    })
  } else {
    res.status(400).json({ message: "No token provided" })
  }

};
