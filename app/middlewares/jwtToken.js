const jwt = require('jsonwebtoken');

// Generate Token
const generateToken = (payload, options) => {
    return jwt.sign(payload, 'nurenderishnoi');
};

// Token Decode
const decodeToken = (token) => {
    const tokenValue = token.split(' ')[1];
    return jwt.verify(tokenValue, 'nurenderishnoi');
};

module.exports = { generateToken, decodeToken };