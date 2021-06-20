// usando os comandos que eu fiz na file commands
const command = require('./commands');
// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// declarando as classes que eu vou importar do discord.js
const { Client } = require('discord.js');
const client = new Client();

// login do bot com token
client.login(process.env.BOT_TOKEN);

// quando o bot estiver no online, vai logar uma mensagem no console e setar um status personalizado
client.on('ready', () => 
{
	console.log(`${client.user.username} está online.`);
	client.user.setPresence({ status: 'online', activity: { name: '>help 🤖 || Não recebo mensagens no privado >:)', type: 'PLAYING' } });
});

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

	// a partir desse ponto, vou estar executando os comandos
	command.assinatura(mensagem, mensagem.content);

	if (mensagem.content.toLowerCase() === '>cc') 
    {
        return command.cc(mensagem);
	}
	else if (mensagem.content.toLowerCase().startsWith('>out ')) 
    {
        return command.out(mensagem, mensagem.content);
    }
	else if (mensagem.content.toLowerCase().startsWith('>roll '))
	{
		return command.roll(mensagem);
	}
	else if (mensagem.content.toLowerCase() === '>help')
	{
		return command.help(mensagem);
	}
	else if (mensagem.content.toLowerCase() === '>jokenpo')
	{
		return command.jokenpo(mensagem);
	}
});

// quando eu chegar no rate limit, vai ser logado a quantidade em segundos do timeout que eu levei
client.on('rateLimit', info => console.log('RATE LIMITED! timeout em segundos: ' + (info.timeout / 1000)));