const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Table = require("ascii-table");
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }));


class PopPlayerCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'pop',
            description: 'Pops the next player from the queue.',
            aliases: ['pop'],
            group: 'xyaa',
            memberName: 'pop',
            args: [
                {
                    key: 'maxrows',
                    prompt: 'How many members (max) do you want to see?',
                    type: 'integer',
                    default: 5
                },
                {
                    key: 'gameId',
                    prompt: 'Game ID of the game you\'d like to play now.',
                    type: 'integer',
                    default: 0
                }
            ]
        })
    }

    async run(msg, { maxrows, gameId }) {
        if (msg.author.id != '217584135818969089') {
            return msg.reply('Only Xyaa can pop members from the queue.!!');
        }
        const db = await dbPromise;
        if(gameId == 0) {
            const member = await db.get(`SELECT * FROM MemQueue LIMIT ${maxrows};`);
        } else {
            const member = await db.get(`SELECT * FROM MemQueue WHERE game_id = ${gameId} LIMIT ${maxrows};`);
        }
        console.log(member);
        if(member) {
            var response = new RichEmbed();
            var game = await db.get('SELECT * FROM GamesList WHERE ID = ? ;', member.game_id);
            response.title = member.member_name;
            response.description = `<@${member.member_id}> wants to play ${game.game_name}`;
            response.addField('IGN', member.ign, true);
            if(member.pubg_id) {
                response.addField("PUBGM ID", member.pubg_id);
            }
            response.setThumbnail('https://res.cloudinary.com/aurghyadip/image/upload/v1577086229/xyaa_white_purple_only_name_bgv66m.png');
            msg.channel.send(response);
            await db.run('DELETE FROM MemQueue WHERE member_id = ? ;', member.member_id);
            msg.channel.send(`<@${member.member_id}> has been removed from the queue.`);
        }
    }
}

module.exports = PopPlayerCommand;
