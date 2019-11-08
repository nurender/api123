const joi = require('joi');

const envVariablesSchema = joi
  .object({
    ENV: joi
      .string()
      .allow(['development', 'production'])
      .required()
  })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, envVariablesSchema);


if (error) {
  throw new Error(`Config validation failed at common: ${error.message}`);
}


const config = {
  env: value.NODE_ENV
};

module.exports = config;
