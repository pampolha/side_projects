const random = require('random');
module.exports = 
{
    CaraCoroa(mensagem) 
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
        return mensagem.channel.send(`<@${mensagem.author.id}> jogou uma moeda, e o resultado foi: ***${moeda}!***`);
	},
};