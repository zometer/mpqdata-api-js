class ImageApiSearchResult {
  constructor(remoteApi, issueId, imageUrlSmall, imageUrlMedium, imageUrlLarge) {
    this.remoteApi = remoteApi;
    this.issueId = issueId;
    this.imageUrlSmall = imageUrlSmall;
    this.imageUrlMedium = imageUrlMedium;
    this.imageUrlLarge = imageUrlLarge;
  }
}

module.exports = ImageApiSearchResult;
