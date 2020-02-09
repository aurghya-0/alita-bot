const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }));

class ClearqueueCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'clearqueue',
            aliases: ['clearqueue'],
            description: 'Clears all the names from the queue',
            group: 'xyaa',
            memberName: 'clearqueue',
        })
    }

    async run(msg) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            const db = await dbPromise;

            try {
                await db.exec("PRAGMA foreign_keys = ON;");
                await Promise.all([
                    db.run('DELETE FROM MemQueue WHERE member_id > 0 ;')
                ]);
                msg.channel.send('Queue has been cleared.');
            } catch (e) {
                console.error(e);
            }
        } else {
            return msg.reply('You can\'t use this command.');
        }
    }
}

module.exports = ClearqueueCommand;