const Commando = require('discord.js-commando');
const path = require('path');
const keys = require('./authtokens');
const sqlite = require('sqlite');
const axios = require('axios')


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


client.registry
    .registerDefaultTypes()
    .registerDefaultGroups()
    .registerDefaultCommands({
        eval_: false,
        ping: false
    })
    .registerGroups([
        ['xyaa', 'Xyaa!']
    ])
    .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}(${client.user.id})`);
    updatePresence();
})

client.setProvider(
    sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.on('error', (error) => console.log(error));

client.login(keys.discord_token);
