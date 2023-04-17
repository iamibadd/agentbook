const Joi = require('joi');
const { password } = require('./custom.validation');

const validateRegister = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};

const validateLogin = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const validateRefreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const validateForgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const validateResetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

module.exports = {
  validateRegister,
  validateLogin,
  validateRefreshTokens,
  validateForgotPassword,
  validateResetPassword,
};
