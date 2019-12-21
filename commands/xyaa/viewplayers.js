const { Command } = require('discord.js-commando');
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
        const members = await db.all(`SELECT * FROM MemQueue LIMIT ${maxrows};`);
        console.log(members);

        var response = "";
        members.forEach((row) => {
            response = response + `${row.id}. ${row.member_name}\n`
        });
        msg.channel.send(response);
    }
}

module.exports = ViewPlayersCommand;