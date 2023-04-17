const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    FRONTEND_URL: Joi.string().required().description('Frontend url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const {
  NODE_ENV,
  PORT,
  MONGODB_URL,
  FRONTEND_URL,
  JWT_SECRET,
  JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_REFRESH_EXPIRATION_DAYS,
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  EMAIL_FROM,
} = envVars;

module.exports = {
  env: NODE_ENV,
  port: PORT,
  mongoose: {
    url: MONGODB_URL + (NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: JWT_SECRET,
    accessExpirationMinutes: JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: SMTP_HOST,
      port: SMTP_PORT,
      auth: {
        user: SMTP_USERNAME,
        pass: SMTP_PASSWORD,
      },
    },
    from: EMAIL_FROM,
  },
  frontendURL: FRONTEND_URL,
};
