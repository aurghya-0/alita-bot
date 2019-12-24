const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))


class UpdatePlay extends Command {
    constructor(client) {
        super(client, {
            name: 'updq',
            aliases: ['uqueue', 'update'],
            description: 'Update your entry in queue',
            group: 'xyaa',
            memberName: 'updq',
            args: [
                {
                    type: 'integer',
                    key: 'gameId',
                    prompt: 'Please enter a game id to play with Xyaa!'
                },
                {
                    type: 'string',
                    key: 'pubgId',
                    prompt: 'If you are playing for PUBG Moblel, enter your NUMERIC ID.',
                    default: ''
                }
            ]
        })
    }
    async run(msg, { gameId, pubgId }) {
        const db = await dbPromise;
        var member = await db.get('SELECT * FROM MemQueue WHERE member_id = ? ;', msg.author.id);
        if (member) {
            try {
                var game = await db.get('SELECT * FROM GamesList WHERE id = ?', gameId);
                if (game) {
                    if (game.is_mobile) {
                        if (member.pubg_id) {
                            await db.run('UPDATE MemQueue SET game_id = $game, pubg_id = $pubg', {
                                $game: gameId,
                                $pubg: pubgId
                            });
                            msg.reply('Your entry is updated successfully. Game on!')
                        } else {
                            return msg.reply('You need to provide your Mobile ID.');
                        }
                    } else {
                        await db.run('UPDATE MemQueue SET game_id = $game, pubg_id = $pubg', {
                            $game: gameId,
                            $pubg: pubgId
                        });
                        msg.reply('Your entry is updated successfully. Game on!')
                    }
                } else {
                    msg.reply("This game does not exist in the Database.");
                }

            } catch (e) {
                console.error(e);
            }
        }
    }
}

module.exports = UpdatePlay;

