const { Card } = require('../models');

const create = (data) => Card.create(data);

const listBoard = (assignees, projects, statuses) => {
  let match = {};
  // query for multiple assignees
  if (assignees) {
    match = { ...match, assignee: { $in: assignees.split(',') } };
  }
  // query for multiple projects
  if (projects) {
    match = { ...match, project: { $in: projects.split(',') } };
  }
  // query for multiple status, i.e. backlog,to-do
  if (statuses) {
    match = { ...match, status: { $in: statuses.split(',') } };
  }
  // return cards based on the query filters
  if (Object.keys(match).length) {
    return Card.find({ ...match });
  }
  // if no filter is selected, return all cards
  return Card.find();
};

module.exports = {
  create,
  listBoard,
};
