const { Command } = require('discord.js-commando');

const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

class MigrateDBCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'migratedb',
            aliases: ['migrate'],
            description: 'Initializes the database for the first time. ADMIN ONLY',
            group: 'xyaa',
            memberName: 'migratedb'
        })
    }

    async run(msg) {
        console.log(msg.member.hasPermission('ADMINISTRATOR'));
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            const dbPromise = Promise.resolve()
                .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }))
                .then(db => db.migrate({ force: 'last' }));
        } else {
            msg.reply("you do not have the permission to add a game to the database.");
        }
    }
}


module.exports = MigrateDBCommand;