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
                    type: 'string',
                    key: 'gameName',
                    prompt: 'Please enter a game name to play with Xyaa!'
                }
            ]
        })
    }

    async run(msg, { gameName }) {
        const db = await dbPromise;
        const [members] = await Promise.all([
            db.run('INSERT INTO MemQueue (member_id, game) VALUES($name, $game)', {
                $name: msg.author.id,
                $game: gameName
            })
        ]);
        msg.reply("Done! Fixed a game with Xyaa!")
    }
}

module.exports = PlayCommand;