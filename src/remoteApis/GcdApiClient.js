const fetch = require('node-fetch');
const logger = require('log4js').getLogger('GcdApiClient');
const config = require('../config').remoteApis.gcd;
const { parse } = require('node-html-parser');
const { buildUrl } = require('./utils');
const parseTemplatedString = require('../util/parseTemplatedString');
const ImageApiSearchResult = require('./ImageApiSearchResult');
const MpqdataApiError = require('../error/MpqdataApiError');

const REQUEST_PROP_MAP = {
  series: 'series',
  issue: 'issues',
  seriesStartYear: 'series_year_began'
};

const queryForImages = async (request) => {
  const results = [];
  const params = { ...config.search.defaultSearchParams };
  Object.keys(REQUEST_PROP_MAP).forEach( k => {
    params[REQUEST_PROP_MAP[k]] = request[k];
  });
  const url = buildUrl(config.search.searchUrl, params);
  logger.debug({ params });

  const response = await fetch(url).then(res => res.json()).catch(e => MpqdataApiError.throw(e.message));
  for (const elem of response) {
    const imgResult = await queryForImagesById(elem.id);
    results.push(imgResult);
  }

  logger.debug('queryForImages.results', results);
  return results;
};

const queryForImagesById = async (id) => {
  const { coverPageUrlSmall, coverPageUrlMedium, coverPageUrlLarge } = config.issue;
  const selectorPath = parseTemplatedString(config.issue.coverImagePath, { id });
  const imgUrlSmall = await fetchImageUrl(id, coverPageUrlSmall, selectorPath);
  const imgUrlMedium = await fetchImageUrl(id, coverPageUrlMedium, selectorPath);
  const imgUrlLarge = await fetchImageUrl(id, coverPageUrlLarge, selectorPath);

  return new ImageApiSearchResult('GCD', id, imgUrlSmall, imgUrlMedium, imgUrlLarge);
};

const fetchImageUrl = async (id, uri, selectorPath) => {
  const url = parseTemplatedString(uri, { id });
  const html = await fetch(url).then(res => res.text()).catch(e => MpqdataApiError.throw(e.message));
  const doc = parse(html);
  const elem = doc.querySelector(selectorPath);

  const src = elem.getAttribute('src').replaceAll(/\?.*$/g, '');
  return src;
};

module.exports = { queryForImages, queryForImagesById };
