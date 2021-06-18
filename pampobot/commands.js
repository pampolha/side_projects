// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// random vai ser usado pra gerar números randômicos (é....)
const random = require('random');
// declarando e instanciando um objeto Client do discord
const { Client } = require('discord.js');
const client = new Client;
// login do bot com token
client.login(process.env.BOT_TOKEN);

class commands 
{
	static cc(mensagem) 
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
	}

	static out(mensagem, content = ' ')
    {
        const out = content.substring(4);
        mensagem.delete()
        .then(() => console.log(`Mensagem apagada no canal "${mensagem.channel.name}". Mensagem original: "${out}"`))
        .catch(() => console.log(`Permissão de apagar mensagem negada no canal "${mensagem.channel.name}". (Caso seja "undefined", a tentativa foi feita numa conversa privada com o bot)`));
        mensagem.channel.send(out);
	}
}

module.exports = commands;