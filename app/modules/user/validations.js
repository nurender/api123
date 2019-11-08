const joi = require('joi');

const createUserSchema = joi.object().keys({
  // phone: joi
  //   .string()
  //   .required()
  //   .label('phone is missing in body')

  fName: joi.string().alphanum().min(3).max(30).required().label('F Name is missing in body'),
  lName: joi.string().alphanum().min(3).max(30).required().label('L Name is missing in body'),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().label('password is missing in body'),
  email: joi.string().email({ minDomainAtoms: 2 }).required().label('email is missing in body')
});

const fun = (req, res, next) => {
  const { error, value } = joi.validate(req.body, createUserSchema);
  if (error) {
    next(error);
    console.log("Error");

  } else {
    console.log("value");

    if (value) next()
  }
};

module.exports = fun;



// const joi = require('joi');
// const createUserSchema = joi.object().keys({
//   phone: joi
//     .string()
//     .required()
//     .label('phone is missing in body')
// });

// const fun = (req, res, next) => {
//   console.log(req.body);
//   const { error, value } = joi.validate(req.body, createUserSchema);
//   if (error) res.send(error);
//   ;
// };

module.exports = fun;
