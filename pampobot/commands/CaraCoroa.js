const { logSlash } = require('../functions/logSlash');
const { blockDM } = require('../functions/blockDM');

const random = require('random');

module.exports = 
{
    name: 'caracoroa',
    aliases: ['c', 'cc'],
    description: 'Jogue uma moeda e veja o resultado!',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        let moeda;
		const resultado = random.bool();
		switch (resultado)
        {
		case true:
            moeda = 'cara';
            break;
		case false:
			moeda = 'coroa';
            break;
		}
        
        if (message)
        {
            return message.channel
            .send(`<@${message.author.id}> jogou uma moeda, e o face para cima foi: ***${moeda}!***`);
        }
        else
        {
            if (blockDM(message, interaction)) return console.log(`Comando bloquado na DM. Tentativa efetuada por: ${interaction.user.username}.`);
            logSlash(message, interaction);
            
            return `A face para cima foi: ***${moeda}!***`;
        }
	},
};