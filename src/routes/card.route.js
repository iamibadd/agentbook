const express = require('express');
const validate = require('../middlewares/validate');
const {
  cardValidation: { validateCreateCard, validateGetListBoard },
} = require('../validations');
const {
  cardController: { create, listBoard },
} = require('../controllers');

const router = express.Router();

router.route('/').post(validate(validateCreateCard), create).get(validate(validateGetListBoard), listBoard);

module.exports = router;

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create a card
 *     tags: [Board List]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - createdBy
 *               - title
 *             properties:
 *               createdBy:
 *                 type: string
 *                 description: id of the user who is creating the card
 *               assignee:
 *                 type: string
 *                 description: id of the user to whom the card is assigned (optional)
 *               title:
 *                 type: string
 *                 description: title of the card
 *               project:
 *                  type: string
 *                  description: project name to which the card will assign to (optional)
 *               status:
 *                  type: string
 *                  description: status of the card (defaults to backlog)
 *             example:
 *               createdBy: 643da905a39b2a220fe786c8
 *               assignee: 643da905a39b2a220fe786c8
 *               title: fix the api bug
 *               project: ContactRM
 *               status: backlog
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Card'
 *
 *   get:
 *     summary: Get board list
 *     description: API for getting the list board. The below parameters are optional, if you won't pass any parameters, the API will return you all the cards
 *     tags: [Board List]
 *     parameters:
 *       - in: query
 *         name: assignees
 *         schema:
 *           type: string
 *         description: ids of the assignees seperated by commas (optional)
 *         example: 643da905a39b2a220fe786c8,643da8fda39b2a220fe786c3
 *       - in: query
 *         name: projects
 *         schema:
 *           type: string
 *         description: project names seperated by commas (optional)
 *         example: ContactRm,AgentBook
 *       - in: query
 *         name: statuses
 *         schema:
 *           type: string
 *         description: status separated by commas (optional)
 *         example: backlog,inprogress
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               example: [{
 *         "_id": "643da9b6a39b2a220fe786d8",
 *         "createdBy": "643da8fda39b2a220fe786c3",
 *         "assignee": "643da8fda39b2a220fe786c3",
 *         "title": "Fix the frontend bug",
 *         "project": "Canban1",
 *         "status": "backlog",
 *         "createdAt": "2023-04-17T20:19:02.287Z",
 *         "updatedAt": "2023-04-17T20:19:02.287Z",
 *     },{
 *         "_id": "643da9bda39b2a220fe786da",
 *         "createdBy": "643da8fda39b2a220fe786c3",
 *         "assignee": "643da8fda39b2a220fe786c3",
 *         "title": "Fix the frontend bug",
 *         "project": "Canban2",
 *         "status": "backlog",
 *         "createdAt": "2023-04-17T20:19:09.146Z",
 *         "updatedAt": "2023-04-17T20:19:09.146Z",
 *     }]
 */
