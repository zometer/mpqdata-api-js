const allianceRoutes = require('./allianceRoutes');
const coverRoutes = require('./coverRoutes');
const helloRoutes = require('./helloRoute');
const rosterRoutes = require('./rosterRoutes');

const applyRoutes = (app) => {
  helloRoutes(app);
  coverRoutes(app);
  allianceRoutes(app);
  rosterRoutes(app);
}

module.exports = applyRoutes;
