const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const Table = require("ascii-table");
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))

class ViewGamesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'viewgames',
            aliases: ['games'],
            description: 'Add a game to the playable games database',
            group: 'xyaa',
            memberName: 'viewgames'
        })
    }

    async run(msg) {
        const db = await dbPromise;
        const games = await Promise.all([
            db.all('SELECT * FROM GamesList')
        ])
        var fieldArray = [];
        var table = new Table();
        table.setHeading(['ID', 'Game Name'])
        games[0].forEach((row) => {
            table.addRow(row.id, row.game_name);
        });
        var textTable = "```css\n" + table.toString() + "\n```";
        msg.channel.send("Here are the games you can play with Xyaa\n" + textTable);
        msg.delete();

    }
}

module.exports = ViewGamesCommand;