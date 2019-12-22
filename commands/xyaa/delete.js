const { Command } = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite');
const { Promise } = require('bluebird');

const dbPromise = Promise.resolve()
    .then(() => sqlite.open(path.join(__dirname, 'member_queue.sqlite3'), { Promise }));

class DeleteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            aliases: ['delete'],
            description: 'Deletes a member from the queue.',
            group: 'xyaa',
            memberName: 'delete',
        })
    }

    async run(msg) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            const members = msg.mentions.members;
            if (members.first()) {
                const userId = members.first().user.id;
                const db = await dbPromise;

                try {
                    await db.exec("PRAGMA foreign_keys = ON;");
                    await Promise.all([
                        db.run('DELETE FROM MemQueue WHERE member_id = ? ;', userId)
                    ]);
                    msg.channel.send(`<@${userId}> has been deleted from the queue.`);
                } catch (e) {
                    console.error(e);
                }
            } else {
                msg.channel.send("Please mention a member to delete from the queue");
            }
        } else {
            const members = msg.mentions.members;
            if (members.first()) {
                const userId = members.first().user.id;
                if (userId == msg.author.id) {
                    const db = await dbPromise;
                    try {
                        await Promise.all([
                            db.run('DELETE FROM MemQueue WHERE member_id = ? ;', userId)
                        ]);
                        msg.channel.send(`<@${userId}> has been deleted from the queue.`);
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    msg.reply("you do not have the permission to delete a member from the queue.");
                }
            } else {
                msg.reply("please mention a member to delete from the queue.");
            }
        }
    }
}

module.exports = DeleteCommand;