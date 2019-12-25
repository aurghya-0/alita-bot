const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }));

class DeleteGameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'deletegame',
            aliases: ['dg'],
            description: 'Deletes a game from the database.',
            group: 'xyaa',
            memberName: 'deletegame',
            args: [
                {
                    type: 'integer',
                    key: 'gameId',
                    'prompt': 'Provide the ID of the which you want to delete.'
                }
            ]
        })
    }

    async run(msg, { gameId }) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            try {
                const db = await dbPromise;
                var game = await db.get('SELECT * FROM GamesList WHERE id = ? ;', gameId);
                if (game) {
                    await db.run('DELETE FROM GamesList WHERE id = ? ;', gameId);
                    msg.channel.send(`${game.game_name} has been deleted from the database.`);
                } else {
                    msg.channel.send(`A game with ID = ${gameId} doesn't exist in the database.`);
                }
            } catch(e) {
                console.error(e);
            }
        } else {
            msg.reply("you don't have permission to do this operation.");
        }
    }
}

module.exports = DeleteGameCommand;