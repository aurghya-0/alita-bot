const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))


class UpdateGame extends Command {
    constructor(client) {
        super(client, {
            name: 'updg',
            aliases: ['ugame'],
            description: 'Update your entry in queue',
            group: 'xyaa',
            memberName: 'updg',
            args: [
                {
                    type: 'integer',
                    key: 'gameId',
                    prompt: 'Enter the game ID you want to edit.'
                },
                {
                    type: 'integer',
                    key: 'isMobile',
                    prompt: 'Is the game a mobile game? 1 for Yes. 0 for No.',
                },
                {
                    type: 'string',
                    key: 'gameName',
                    prompt: 'Enter the name of the game.'
                }
            ]
        })
    }
    async run(msg, { gameId, isMobile, gameName }) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            const db = await dbPromise;
            try {
                var game = await db.get('SELECT * FROM GamesList WHERE id = ?', gameId);
                if (game) {
                    await db.run('UPDATE GamesList SET game_name = $name, is_mobile = $mobile', {
                        $name: gameName,
                        $mobile: isMobile
                    });
                    msg.channel.send("Updated Entry!");
                } else {
                    msg.reply("That game doesn't exist in the database!")
                }
            } catch (e) {
                console.error(e);
            }
        } else {
            msg.reply("You do not have permission to change the games list.")
        }
    }
}

module.exports = UpdateGame;

