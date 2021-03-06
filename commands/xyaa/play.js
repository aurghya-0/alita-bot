const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { RichEmbed } = require('discord.js');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))


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
                },
                {
                    type: 'string',
                    key: 'ign',
                    prompt: 'Please enter your steam or respective platform username for Xyaa to invite you.'
                },
                {
                    type: 'string',
                    key: 'pubgId',
                    prompt: 'If you are playing for PUBG Moblel, enter your NUMERIC ID.',
                    default: ''
                },
                {
                    type: 'string',
                    key: 'mention',
                    prompt: 'You should mention someone if you are an admin',
                    default: ''
                }
            ]
        })
    }

    async run(msg, { gameId, ign, pubgId }) {
        if (msg.author.id == '217584135818969089') {
            return msg.reply("Momma I'll play with you IRL. Hug me, NOW!")
        }
        var member = msg.author;
        const db = await dbPromise;
        const mentions = msg.mentions.members;
        if(mentions.first()) {
            if (msg.member.hasPermission('ADMINISTRATOR')) {
                member = mentions.first().user;
            } else {
                return msg.reply('You don\'t have permission to add a member to the queue.');
            }
        }
        const existingMember = await db.get("SELECT * FROM MemQueue WHERE member_id = ? ;", member.id);
        if (existingMember) {
            msg.reply("You can't queue more than once. You have queued for being in a game already.");
        } else {
            try {
                var game = await db.get('SELECT * FROM GamesList WHERE id = ? ;', gameId);
                if (game && game.is_mobile > 0 && !pubgId) {
                    return msg.reply("You need to provide your PUBGM ID \n **Format: **`&play <gameId> <ign> [pubgId]`");
                }
                await Promise.all([
                    db.exec("PRAGMA foreign_keys = ON;"),
                    db.run('INSERT INTO MemQueue (member_id, member_name, ign, pubg_id, game_id) VALUES($id, $name, $inGameName, $pubgN, $game);', {
                        $id: member.id,
                        $name: member.username,
                        $inGameName: ign,
                        $pubgN: pubgId,
                        $game: gameId
                    })
                ]);
                var fieldArray = [];
                fieldArray.push({
                    name: "IGN",
                    value: ign,
                    inline: false
                });
                if (game.is_mobile) {
                    fieldArray.push({
                        name: "MOBILE ID",
                        value: pubgId,
                        inline: false
                    });
                }
                var response = new RichEmbed({
                    title: `${game.game_name} match with Xyaa`,
                    description: `Your name has been added to the Queue`,
                    fields: fieldArray
                });
                msg.channel.send(response);
                msg.delete();
            } catch (e) {
                console.error(e);
                if (e.code == 'SQLITE_CONSTRAINT') {
                    msg.reply("The game ID does not exist in the database. Try again with another game id. (To view the games available, type `&games`)");
                }
            }
        }
    }
}

module.exports = PlayCommand;