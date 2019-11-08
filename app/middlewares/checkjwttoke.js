const jwt = require('./jwtToken');
// connect database
const mongoose = require('mongoose');
const Users = mongoose.model('Users');

const guardJwt = async (req, res, next) => {
    // console.log(req.headers);
    
    if (!req.headers.authorization) {
        return res.status(401).json({
            message: 'Authorization header not found',
            errorCode: 'jwt.authorization_header_not_found'
        });
    }

    if (!req.headers.authorization.match(/^Bearer /)) {
        return res.status(401).json({
            message: 'Authorization header must start with Bearer',
            errorCode: 'jwt.authorization_header_invalid'
        });
    }
    debugger
    // const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.decodeToken(req.headers.authorization);    
  var data =await  Users.findOne({ email: payload.email })
  if (data == null) {
  res.status(401).json({ 
          status: 'error',
       success: false,
         data: {
         },
         message: "User not active",
         stack: res.statusCode,
         method:req.method,
         url:req.url
    })
  }
    next();
  };




    // db.query('SELECT * FROM Users WHERE Email=?', [payload.Email]).then(([Token, FieldData]) => {
    //     if (Token.length) {
    //         if (Token[0].status == 'Active') {

    //             next();
    //         }
    //         else {
    //             res.status(401).json({ Msg: "User not active", status: 401 })
    //         }
    //     } else {

    //         res.status(401).json({ Msg: "User unauthorized", status: 401 })
    //     }


    // }).catch((err) => {
    //     return res.status(401).json({
    //         error: err.message,
    //         errorCode: (err.name == 'TokenExpiredError') ? 'jwt.token_expired' : 'jwt.token_invalid'
    //     });
    // })


    // User.findOne({ _id: payload.id }, (err, user) => {
    //     if (err) throw err;

    //     if (!user) {
    //         return res.status(400).json({
    //             error: 'User not found',
    //             errorCode: 'jwt.user_not_found'
    //         });
    //     }

    //     req.user = user;
    //     next();
    // });



module.exports = { guardJwt }