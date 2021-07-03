require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOT_TOKEN);

const blockDM = (message, interaction) =>
{
    if (message && message.channel.type === 'dm') return true;
    else if (interaction && interaction.member === undefined) return true;
};

module.exports = { blockDM };