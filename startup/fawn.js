const Fawn = require('fawn');
const config = require('config');

module.exports = function(){
    Fawn.init(config.get('path'));
}