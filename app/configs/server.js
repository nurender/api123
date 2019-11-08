const joi = require('joi');

const envVariablesSchema = joi
  .object({ PORT: joi.number().required() })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, envVariablesSchema);
if (error) {
  throw new Error(`Config validation error at server: ${error.message}`);
}

const config = {
  port: value.PORT
};

module.exports = config;
