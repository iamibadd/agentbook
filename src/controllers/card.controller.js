const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { cardService } = require('../services');

const create = catchAsync(async (req, res) => {
  const card = await cardService.create(req.body);
  res.status(httpStatus.CREATED).json(card);
});

const listBoard = catchAsync(async (req, res) => {
  const { assignees, projects, statuses } = req.query;
  const cards = await cardService.listBoard(assignees, projects, statuses);
  res.status(httpStatus.CREATED).json(cards);
});

module.exports = {
  create,
  listBoard,
};
