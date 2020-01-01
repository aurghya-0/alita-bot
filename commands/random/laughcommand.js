const { Command } = require('discord.js-commando');
const path = require('path');
const oneLiner = require('one-liner-joke');
const logger = require('../../logg');

class LaughCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'laugh',
            aliases: ['joke', 'jokes'],
            description: 'Makes you laugh!',
            group: 'random',
            memberName: 'laugh',
            args: [
                {
                    type: 'string',
                    key: 'tag',
                    prompt: 'Enter a tag for jokes!',
                    default: ''
                }
            ]
        })
    }

    async run(msg, { tag }) {
        if(tag) {
            var joke = oneLiner.getRandomJokeWithTag(tag, {
                'exclude_tags': ['dirty', 'racist', 'marriage', 'sex']
            });
        } else {
            var joke = oneLiner.getRandomJoke({
                'exclude_tags': ['dirty', 'racist', 'marriage', 'sex']
            });
        }
        logger.info(`tags: ${joke.tags}`);
        msg.channel.send(joke.body);
        msg.delete();
    }
}

module.exports = LaughCommand;