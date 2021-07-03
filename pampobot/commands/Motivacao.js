require('dotenv').config();

const { logSlash } = require('../functions/logSlash');
const { blockDM } = require('../functions/blockDM');

const random = require('random');

const affirmations = require(process.env.pampobotDir + 'data/affirmations');
module.exports =
{
    name: 'motivação',
    aliases: ['m', 'motivacao'],
    description: 'Receba uma mensagem verdadeira que eu escolhi para você!',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (blockDM(message, interaction)) return console.log(`Comando bloquado na DM. Tentativa efetuada por: ${interaction.user.username}.`);
        logSlash(message, interaction);

        const escolha = random.int(0, (affirmations.length - 1)); 
        if (message) return message.reply(`**${affirmations[escolha]}**`);
        else return `**${affirmations[escolha]}**`;
    },
};