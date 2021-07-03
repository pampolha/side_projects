require('dotenv').config();

const blockDM = (message, interaction) =>
{
    if (message && message.channel.type === 'dm') return true;
    else if (interaction && interaction.member === undefined) return true;
};

module.exports = { blockDM };