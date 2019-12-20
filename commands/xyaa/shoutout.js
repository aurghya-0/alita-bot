const { Command } = require('discord.js-commando');
const path = require('path');

class ShoutoutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'shoutout',
            aliases: ['shout'],
            description: 'Get a shoutout from Xyaa!',
            group: 'xyaa',
            memberName: 'shoutout',
        })
    }

    async run(msg) {
        msg.reply("She doesn't give shoutouts! ");
    }
}

module.exports = ShoutoutCommand;