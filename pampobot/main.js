// usando os comandos que eu fiz na file commands
const command = require('./commands');
// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// criando um objeto a partir do package
const { Client } = require('discord.js');
// instanciando um objeto do tipo criado acima
const client = new Client;

// login do bot com token
client.login(process.env.BOT_TOKEN);

// quando o bot estiver no estado "ready"(online), vai logar uma mensagem no console
client.on('ready', () => console.log(`${client.user.username} está online.`));

// logando todas as mensagens diretas no privado do bot e todas as mensagens que começam com o prefixo do bot.
client.on('message', msg =>
{
    if (msg.channel.name === undefined)
    {
        console.log(`${msg.author.username} disse: "${msg.content}" no chat privado do bot`);
    }
    else if (msg.content.startsWith('>'))
    {
        console.log(`${msg.author.username} disse: "${msg.content}" no canal "${msg.channel.name}" do servidor "${msg.guild.name}"`);
    }

    switch (msg.content.toLowerCase())
    {
        case '>cc':
            msg.channel.send(`<@${msg.author.id}> jogou uma moeda, e o resultado foi: ***${command.cc()}!***`);
            break;
    }
});
