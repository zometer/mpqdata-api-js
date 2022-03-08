const coverRoutes = require('./coverRoutes');
const helloRoutes = require('./helloRoute');

const applyRoutes = (app) => {
  helloRoutes(app);
  coverRoutes(app);
}

module.exports = applyRoutes;