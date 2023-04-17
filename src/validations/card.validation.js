const Joi = require('joi');
const { objectId } = require('./custom.validation');

const validateCreateCard = {
  body: Joi.object().keys({
    createdBy: Joi.string().required().custom(objectId),
    assignee: Joi.string().custom(objectId),
    title: Joi.string().required(),
    project: Joi.string(),
    status: Joi.string(),
  }),
};

const validateGetListBoard = {
  query: Joi.object().keys({
    assignees: Joi.string(),
    projects: Joi.string(),
    statuses: Joi.string(),
  }),
};

module.exports = {
  validateCreateCard,
  validateGetListBoard,
};
