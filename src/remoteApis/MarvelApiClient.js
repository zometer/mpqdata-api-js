const { URL, URLSearchParams } = require('url');
const logger = require('log4js').getLogger('MarvelApiClient');
const config = require('../config').remoteApis.marvel;
const MpqdataApiError = require('../error/MpqdataApiError');
const ImageApiSearchResult = require('./ImageApiSearchResult');
const md5 = require('md5');
const _ = require('lodash');
const fetch = require('node-fetch');

const SEARCH_PARAM_KEYS = {
  series: 'title',
  seriesStartYear: 'startYear',
  issue: 'issueNumber'
};

const IMAGE_SIZE_MAP = {
  small: 'portrait_medium',
  medium: 'portrait_uncanny',
  large: 'clean'
};

const queryForImages = async (searchRequest) => {
  const searchParams = {};
  Object.assign(searchParams, config.defaultSearchParams);
  addApiFieldsToRequestParams(config.publicKey, config.privateKey, searchParams);
  Object.keys(SEARCH_PARAM_KEYS)
    .filter( k => _.has(searchRequest, k) )
    .forEach( k => {
      searchParams[SEARCH_PARAM_KEYS[k]] = searchRequest[k];
    })
  ;
  const url = buildUrl(config.searchUrl, searchParams);
  logger.debug('searchUrl', url.toString());

  const response = await fetch(url)
    .then(res => res.json())
    .catch(e => { throw new MpqdataApiError(e.message); })
  ;

  return convertToSearchResults(response);
};

const convertToSearchResults = async (response) => {
  let results = [];
  if (response.data.results.length === 0) {
    return results;
  }

  for (const result of response.data.results) {
    if (! _.has(result, 'images')) {
      continue;
    }
    result.images.forEach( image => {
      results.push(buildImageApiSearchResult(result.id, image));
    });

    const varUris = result.variants.map( variant => variant.resourceURI );
    for (const uri of varUris) {
      const varResults = await queryForImagesByUri(uri);
      results = results.concat(varResults);
    }
  }
  return results;
};

const queryForImagesByIssueId = async (id) => {
  const params = addApiFieldsToRequestParams(config.publicKey, config.privateKey, { id });
  const url = buildUrl(config.comicInfoUrl, params);
  const response = await fetch(url).then().catch(e => MpqdataApiError.throw(e.message));

  const results = extractImageApiSearchResultsFromApiResponse(response);
  return results;
};

const queryForImagesByUri = async (uri) => {
  const params = addApiFieldsToRequestParams(config.publicKey, config.privateKey, { });
  const url = buildUrl(uri, params);
  logger.debug('queryForImagesByUri', url.toString());

  const response = await fetch(url).then(res => res.json()).catch(e => MpqdataApiError.throw(e.message));
  const results = extractImageApiSearchResultsFromApiResponse(response);
  return results;
};

const extractImageApiSearchResultsFromApiResponse = (response) => {
  const results = [];
  response.data.results.forEach( result => {
    if (! _.has(result, 'images')) {
      return;
    }
    result.images.forEach(image => {
      const imgResult = buildImageApiSearchResult(result.id, image);
      results.push(imgResult);
    });
  });
  return results;
};

const buildImageApiSearchResult = (id, image) => {
  const [imageUrlSmall, imageUrlMedium, imageUrlLarge] = extractImageUrls(image);
  const result = new ImageApiSearchResult('Marvel', id, imageUrlSmall, imageUrlMedium, imageUrlLarge);
  return result;
};

const buildUrl = (urlString, params) => {
  const url = new URL(urlString);
  url.search = new URLSearchParams(params);
  return url;
};

const extractImageUrls = (image) => {
  const urls = Object.keys(IMAGE_SIZE_MAP).map(size => `${image.path}/${IMAGE_SIZE_MAP[size]}.${image.extension}`);
  return urls;
};

const addApiFieldsToRequestParams = (publicKey, privateKey, params) => {
  const now = new Date();
  const hash = generateRequestHash(now, publicKey, privateKey);
  params.apikey = publicKey;
  params.ts = now.getTime();
  params.hash = hash;
  return params;
};

const generateRequestHash = (date, publicKey, privateKey) => {
  const toBeHashed = date.getTime() + privateKey + publicKey;
  const hash = md5(toBeHashed);
  return hash;
};

module.exports = { queryForImages, queryForImagesByIssueId };
