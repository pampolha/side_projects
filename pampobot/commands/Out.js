const { blockDM } = require('../functions/blockDM');
const { logSlash } = require('../functions/logSlash');

module.exports =
{
    name: 'out',
    aliases: ['o'],
    description: 'Vou tentar copiar a mensagem que você escrever!',
    slash: 'both',
    testOnly: false,
    minArgs: 1,
    expectedArgs: '<mensagem>',
    callback: ({ message, text, interaction }) =>
    {
        if (blockDM(message, interaction)) return console.log(`Comando bloquado na DM. Tentativa efetuada por: ${interaction.user.username}.`);
        logSlash(message, interaction);

        const out = text;

        if (!out) return;

        if (message && message.deletable === true)
        {
            message.delete()
            .then(() => console.log(`pampobot apagou uma message no canal "${message.channel.name}" do servidor "${message.guild.name}". Mensagem original: "${out}"`));
            return message.channel.send(out);
        }
        else
        {
            return out;
        }
	},
};