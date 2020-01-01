const Commando = require('discord.js-commando');
const path = require('path');
const keys = require('./authtokens');
const sqlite = require('sqlite');
const axios = require('axios');
const logger = require('./logg');

// Commando Options
const client = new Commando.CommandoClient({
    commandPrefix: '&',
    owner: '254256459603247105',
    invite: 'https://discord.gg/wcF7gpU'
});

const updatePresence = () => {
    client.user.setActivity("with momma!", {
        type: 'PLAYING'
    });
}
// TODO: Craete a database system seperate for each guild (with a seperate image also, fetch image from the db?)
// Maybe add a guild based database system or add a column for guild

client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        eval_: false,
        ping: false
    })
    .registerGroups([
        ['xyaa', 'Xyaa!'],
        ['random', 'Random Stuffs!!']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    logger.info(`Logged in as ${client.user.tag}(${client.user.id})`);
    updatePresence();
})

client.setProvider(
    sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.on('error', (error) => logger.fatal(error));

client.login(keys.discord_token);
