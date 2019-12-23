const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Table = require("ascii-table");
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }));


class ViewPlayersCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'viewplayers',
            description: 'View the queue of members who wants to play',
            aliases: ['view', 'queue'],
            group: 'xyaa',
            memberName: 'viewplayers',
            args: [
                {
                    key: 'maxrows',
                    prompt: 'How many members (max) do you want to see?',
                    type: 'integer',
                    default: 5
                }
            ]
        })
    }

    async run(msg, { maxrows }) {
        const db = await dbPromise;
        var sql = `SELECT member_name, ign, pubg_id, game_name FROM MemQueue INNER JOIN GamesList On GamesList.id = MemQueue.game_id LIMIT ${maxrows};`
        const members = await db.all(sql);
        console.log(members);

        var response = new RichEmbed({
            title: 'Member Queue',
            description: 'List of people who wants to play with Xyaa'
        });
        var fieldArray = [];
        members.forEach((row) => {
            var text = `IGN - ${row.ign}\n`
            if(row.pubg_id) {
                text = text + `PUBG ID - ${row.pubg_id}`;
            }
            fieldArray.push({
                name: `${row.member_name} - ${row.game_name}`,
                value: text
            });
        });
        response.fields = fieldArray;
        msg.channel.send(response);
    }
}

module.exports = ViewPlayersCommand;