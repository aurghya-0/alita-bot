const { Command } = require('discord.js-commando');

const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');
const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))


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
        console.log(msg.member.hasPermission('ADMINISTRATOR'));
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            const db = await dbPromise;
            try {
                await Promise.all([
                    db.run('INSERT INTO GamesList (game_name) VALUES(?);', gameName)
                ]);
                msg.reply(`${gameName} has been added to the database`);
            } catch (e) {
                console.error(e);
            }
        } else {
            msg.reply("you do not have the permission to add a game to the database.");
        }
    }
}


module.exports = AddGameCommand;