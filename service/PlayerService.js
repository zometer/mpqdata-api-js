const Player = require("../model/Player");

const PlayerService = {
  mergeAndSave: async (members) => {
    const names = members.map(m => m.playerName); 
    const players = await Player.findAll( {where: {playerName: names}} );
    players.forEach(player => {
      members
        .filter(m => m.playerName === player.playerName)
        .forEach( m => m.playerId = player.playerId ) 
      ;
    });
    const newMembers = members.filter(m => m.playerId === null); 
    if (newMembers.length > 0) { 
      console.log("newMembers", newMembers);
      Player.bulkCreate(newMembers); 
    }
  }
}; 

module.exports = PlayerService;