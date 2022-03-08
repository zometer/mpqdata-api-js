const helloRoutes = require('./helloRoute');

const applyRoutes = (app) => {
  helloRoutes(app);
}

module.exports = applyRoutes;