var keys = require('./authtokens');
const Logger = require('logdna');

// Logdna Options
var options = {
    app: 'alita-bot',
    index_meta: true,
    tags: ['alita', 'alita-beta', 'discord-bot']
}
module.exports = Logger.createLogger(keys.logdna_key, options);