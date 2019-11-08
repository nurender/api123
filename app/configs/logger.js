const joi = require('joi');

const envVariablesSchema = joi
  .object({
    LOGGER_LEVEL: joi
      .string()
      .allow(['error', 'warn', 'info', 'debug'])
      .default('info'),
    LOG_ENABLE_CONSOLE: joi
      .boolean()
      .truthy('true')
      .falsy('false')
      .default(true),
    LOG_PATH: joi.string().default('logs/'),
    LOGGER_ENABLED: joi
      .boolean()
      .truthy('true')
      .falsy('false')
      .default(true)
  })
  .unknown()
  .required();

const { error, value } = joi.validate(process.env, envVariablesSchema);
if (error) {
  throw new Error(`Config validation error at logger: ${error.message}`);
}


const config = {
  level: value.LOGGER_LEVEL,
  enabled: value.LOGGER_ENABLED,
  console: value.LOG_ENABLE_CONSOLE,
  path: value.LOG_PATH
};

module.exports = config;
