const { Command } = require('discord.js-commando');
const path = require('path');
const oneLiner = require('one-liner-joke');

class ShoutoutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'laugh',
            aliases: ['joke', 'jokes'],
            description: 'Makes you laugh!',
            group: 'random',
            memberName: 'laugh',
        })
    }

    async run(msg) {
        var joke = oneLiner.getRandomJoke();
        msg.channel.send(joke.body);
        msg.delete();
    }
}

module.exports = ShoutoutCommand;