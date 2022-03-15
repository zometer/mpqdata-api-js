const { hello } = require('../service/HelloService');

const helloController = (req, res) => {
  res.send( hello() );
};

module.exports = helloController;
