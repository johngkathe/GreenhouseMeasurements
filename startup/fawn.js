const Fawn = require('fawn');
const Choice = require('../navigation/determineDatabase');

module.exports = function(dbChoice){

    const { dbPath } = Choice(dbChoice);

    Fawn.init(dbPath);
}