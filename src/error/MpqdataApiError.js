
class MpqdataApiError extends Error { 
  constructor(message) { 
    super(message);
    this.name = "MpqdataApiError";
  }
}

module.exports = MpqdataApiError;