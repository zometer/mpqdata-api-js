class Alliance {
  constructor(guid, name, type, maxSize, size) {
    this.allianceGuid = guid;
    this.allianceName = name;
    this.allianceType = type;
    this.allianceMaxSize = maxSize;
    this.members = [];
  }

  get allianceSize() {
    return this.members.length;
  }
}

module.exports = Alliance;
