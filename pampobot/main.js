// usando os comandos que eu fiz na file commands
const command = require('./commands');
// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// declarando e instanciando um objeto Client do discord
const { Client } = require('discord.js');
const client = new Client;

// login do bot com token
client.login(process.env.BOT_TOKEN);

// quando o bot estiver no estado "ready"(online), vai logar uma mensagem no console
client.on('ready', () => console.log(`${client.user.username} está online.`));

// logando todas as mensagens que começam com o prefixo do bot. também bloqueando as mensagens que são enviadas no privado do bot
client.on('message', mensagem => 
{
	if (mensagem.channel.name === undefined) 
    {
		return;
	}
	else if (mensagem.content.startsWith('>')) 
    {
		console.log(`${mensagem.author.username} disse: "${mensagem.content}" no canal "${mensagem.channel.name}" do servidor "${mensagem.guild.name}"`);
	}

	if (mensagem.content.toLowerCase() === '>cc') 
    {
        command.cc(mensagem);
	}
	else if (mensagem.content.toLowerCase().startsWith('>out ')) 
    {
        command.out(mensagem, mensagem.content);
    }
});
