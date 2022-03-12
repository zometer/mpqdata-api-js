const _ = require('lodash');

const parseTemplatedString = (template, context) => {
  let out = String(template);
  while ( out.match(/\${\S+?}/) ) {
    const [target, key] = out.match(/\${(\S+?)}/);
    const value = _.get(context, key);
    out = _.replace(out, target, value);
  }
  return out;
};

module.exports = parseTemplatedString;
