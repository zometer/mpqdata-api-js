
class MpqdataApiError extends Error {
  static throw(message) {
    throw new MpqdataApiError(message);
  }

  constructor(message) {
    super(message);
    this.name = 'MpqdataApiError';
  }
}

module.exports = MpqdataApiError;
