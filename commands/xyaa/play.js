const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))
    .then(db => db.migrate({ force: 'last' }));


class PlayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'play',
            aliases: ['play'],
            description: 'Queue for playing with Xyaa',
            group: 'xyaa',
            memberName: 'play',
            args: [
                {
                    type: 'integer',
                    key: 'gameId',
                    prompt: 'Please enter a game id to play with Xyaa!'
                }
            ]
        })
    }

    async run(msg, { gameId }) {
        const db = await dbPromise;
        const [members] = await Promise.all([
            db.run('INSERT INTO MemQueue (member_id, game_id) VALUES($name, $game);', {
                $name: msg.author.id,
                $game: gameId
            })
        ]);
        msg.reply("Done! Fixed a game with Xyaa!")
    }
}

module.exports = PlayCommand;