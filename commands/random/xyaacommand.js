const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const path = require('path');
const oneLiner = require('one-liner-joke');
const logger = require('../../logg');

class XyaaCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'xyaa',
            aliases: ['mom', 'shagufta'],
            description: 'She streams often.',
            group: 'random',
            memberName: 'xyaa'
        })
    }

    async run(msg) {
        var descS = `Hey! My name's Shagufta Iqbal but Im better known as Xyaa(Pronounced as 'Z-A-A-Y-A')! I love playing games and connecting with others through Youtube. Video - games have been a huge part of my life and I hope to share laughs, scares, and awesome experiences with you here in the Pupperino Squad and hope you enjoy what you see! ❤`;
        var configS = `CPU - Intel® Core™ i5-8600k\nMotherboard - Asus ROG Strix Z370-E\nGPU - Nvidia GeForce RTX 2060 FE\nRAM - 16 GB Corsair Vengeance\nMonitor1 - HP 27X 27-inch Full HD Gaming Display Monitor\nMonitor2 - LG 24gm77 144hz 1ms\nKeyboard : Corsair K70\nMouse : Zowie FK2\nMousepad : Zowie GS-R\nHeadset : HP Pavillion Gaming 400 Headset\nWebcam : Logitech C922\nMic : Blue Yeti`
        var response = new RichEmbed({
            title: `Shagufta 'Xyaa' Iqbal`,
            description: descS,
            fields: [
                {
                    name: 'PC Config',
                    value: configS,
                    inline: false
                }
            ]
        });
        msg.delete();
        return msg.channel.send(response);
    }
}

module.exports = XyaaCommand;