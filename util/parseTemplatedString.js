const _ = require('lodash');

const parseTemplatedString = (template, context) => { 
  let out = new String(template); 
  while ( out.match(/\${\S+?}/) ) { 
    let [target, key] = out.match(/\${(\S+?)}/);
    let value = _.get(context, key); 
    out = _.replace(out, target, value);
  }
  return out;
}

module.exports = parseTemplatedString;
