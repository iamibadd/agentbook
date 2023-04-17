const mongoose = require('mongoose');
const { toJSON } = require('./plugins');

const cardSchema = mongoose.Schema(
  {
    // id of the user who has created the card
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
    // id of the user to whom the card is assigned to
    // this field is optional, the creator can assign the card to a user or not
    assignee: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
    },
    // title of the card
    title: {
      type: String,
      required: true,
    },
    // this field is optional, user can either assign a project or not
    project: {
      type: String,
      default: '',
    },
    // status of the card, i.e. backlog, to do
    status: {
      type: String,
      default: 'backlog',
    },
  },
  {
    timestamps: true,
  }
);

// // add a plugin that converts mongoose to json
// cardSchema.plugin(toJSON);

/**
 * @typedef Card
 */
const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
