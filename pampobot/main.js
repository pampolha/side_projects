// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// a variável discord vai ser o meu ponto de entrada pra instanciar objetos do módulo discord.js
const Discord = require('discord.js');
const client = new Discord.Client();
// a função abaixo exporta todos os meus comandos automaticamente pro main
require('fs').readdirSync(__dirname + '/commands').forEach(comando => 
{
	if (comando.match(/\.js$/) !== null && comando !== 'index.js') 
	{
		const nome = comando.replace('.js', '');
		exports[nome] = require('./commands/' + comando);
	}
});
const { CaraCoroa } = require('./commands/CaraCoroa');
const { Assinatura } = require('./commands/Assinatura');
const { Help } = require('./commands/Help');
const { Jokenpo } = require('./commands/Jokenpo');
const { Roll } = require('./commands/Roll');
const { Out } = require('./commands/Out');
const { LoremIpsum } = require('./commands/LoremIpsum');
const { APOD } = require('./commands/APOD');
const { Motivacao } = require('./commands/Motivacao');

// usando o prefixo como uma variável pra facilitar a manutenção
const prefix = '>';
// logando erros
client.on('error', err => console.error(err));
// quando o bot estiver no online, vai logar uma mensagem no console e setar um status personalizado
client.on('ready', () => 
{
	console.log(`${client.user.username} está online.`);
	client.user.setPresence({ status: 'online', activity: { name: '>help 🤖 || Não recebo mensagens no privado >:)', type: 'PLAYING' } });
});

// quando eu chegar no rate limit, vai ser logado a quantidade em segundos do timeout que eu levei
client.on('rateLimit', info => console.log('RATE LIMITED! timeout em segundos: ' + (info.timeout / 1000)));

// logando um aviso de desconexão
client.on('disconnect', () => console.log('pampobot foi desconectado!'));

// logando todas as mensagens que começam com o prefixo do bot. também bloqueando as mensagens que são enviadas no privado do bot ou que são de bots
client.on('message', mensagem => 
{
	if (mensagem.channel.type === 'dm' || mensagem.author.bot === true) return;
	if (mensagem.content.startsWith(prefix))
	{
		console.log(`${mensagem.author.username} disse: "${mensagem.content}" no canal "${mensagem.channel.name}" do servidor "${mensagem.guild.name}"`);

		const argumentos = mensagem.content.slice(prefix.length).split(/\s+/);
		const comando = argumentos.shift().toLowerCase().trim();

		if (comando.match(/^(\bcc\b|\bcaracoroa\b)/)) CaraCoroa(mensagem);
		else if (comando.match(/^(\bh\b|\bhelp\b)/)) Help(mensagem);
		else if (comando.match(/^(\bj\b|\bjokenpo\b)/)) Jokenpo(mensagem);
		else if (comando.match(/^(\br\b|\broll\b)/)) Roll(mensagem);
		else if (comando.match(/^(\bo\b|\bout\b)/)) Out(mensagem);
		else if (comando.match(/^(\bli\b|\bloremipsum\b)/)) LoremIpsum(mensagem);
		else if (comando.match(/^(\bapod\b)/)) APOD(mensagem);
		else if (comando.match(/^(\bm\b|\bmotivação\b)/)) Motivacao(mensagem);

		mensagem.channel
	}
	// reage com o emote 😈 quando a mensagem contém ">:)"
	Assinatura(mensagem);
});

// login do bot com token
client.login(process.env.BOT_TOKEN);