const allianceRoutes = require('./allianceRoutes');
const coverRoutes = require('./coverRoutes');
const helloRoutes = require('./helloRoute');

const applyRoutes = (app) => {
  helloRoutes(app);
  coverRoutes(app);
  allianceRoutes(app);
}

module.exports = applyRoutes;