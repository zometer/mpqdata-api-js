const { URL, URLSearchParams } = require('url');

const buildUrl = (urlString, params) => {
  const url = new URL(urlString);
  url.search = new URLSearchParams(params);
  return url;
};

module.exports = { buildUrl };
