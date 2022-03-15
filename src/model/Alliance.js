class Alliance {
  constructor(guid, name, type, maxSize, size) {
    this.allianceGuid = guid;
    this.allianceName = name;
    this.allianceType = type;
    this.allianceMaxSize = maxSize;
    this.members = [];
    this.size = size;
  }

  get allianceSize() {
    return this.members.length > 0 ? this.members.length : this.size;
  }
}

module.exports = Alliance;
