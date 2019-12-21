const { Command } = require('discord.js-commando');

const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }));


class AddGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'addgame',
            aliases: ['add'],
            description: 'Add a game to the playable games database',
            group: 'xyaa',
            memberName: 'addgame',
            args: [
                {
                    type: 'string',
                    key: 'gameName',
                    prompt: 'Enter the name of the game to add!'
                }
            ]
        })
    }

    async run(msg, { gameName }) {
        const db = await dbPromise;
        try {
            await Promise.all([
                db.run('INSERT INTO GamesList (game_name) VALUES($name);', {
                    $name: gameName
                })
            ]);
            msg.reply(`${gameName} has been added to the database`);
        } catch (e) {
            console.error(e);
        }
    }
}


module.exports = AddGameCommand;