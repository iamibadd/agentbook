const { version } = require('../../package.json');
const config = require('../config/config');

const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'API documentation for AgentBook',
    version,
    license: {
      name: 'MIT',
      url: 'https://github.com/iamibadd/agentbook',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}`,
    },
  ],
};

module.exports = swaggerDef;
