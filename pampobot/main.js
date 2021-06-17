// usando os comandos que eu fiz na file commands
const command = require('./commands');
// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// criando um objeto a partir do package
const { Client, Message } = require('discord.js');
// instanciando um objeto do tipo criado acima
const client = new Client;
// variável que contém o prefixo do bot pra uma manutenção mais eficiente
const prefixo = '>';

// login do bot com token
client.login(process.env.BOT_TOKEN);

// instanciando um objeto date pra fins de logging mais completo
const horario = new Date;

// quando o bot estiver no estado "ready", vai logar uma mensagem no console
client.on('ready', () => console.log(`[${horario.toUTCString()}] `+client.user.username+' está online.'));

const commands = require('./commands');

// logar um aviso de erro
client.on('error', () => console.log(`Erro às [${horario.toUTCString()}]`));

// logando todas as mensagens do bot e os comndos requeridos pelas pessoas
client.on('message', msg =>
{
    if (msg.author.id === client.user.id || msg.content.startsWith(prefixo))
    {
        console.log(`${msg.author.username} disse: ${msg.content} em ${msg.channel.name}`);
    }
    switch (msg.content)
    {
        case '>cc':
            msg.channel.send(`<@${msg.author.id}> jogou uma moeda, e o resultado foi: ***${command.cc()}!***`);
    }
});
