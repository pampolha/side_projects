const { blockDM } = require('../functions/blockDM');

const Discord = require('discord.js');
const { logSlash } = require('../functions/logSlash');

module.exports =
{
    name: 'help',
    aliases: ['h'],
    description: 'Lista contendo os comandos do bot e as suas instruções!',
    slash: 'both',
    testOnly: false,
    callback: ({ message, interaction }) =>
    {
        if (blockDM(message, interaction)) return console.log('Comando bloquado na DM.');
        
        logSlash(message, interaction);

        const embed = new Discord.MessageEmbed();

        embed.setAuthor('Legenda: "<>" são argumentos obrigatórios, "[]" são argumentos opcionais.')

        .setTitle('***A ajuda está aqui! >:)***')

        .addField('**Cara ou coroa**', 'Jogue uma moeda e veja o resultado usando: `>caracoroa | >c | >cc`.' +
        '\n*Suporte para comando de "/":*  ✅', false)

        .addField('**Roll**', 'Jogue um dado com até um modificador usando: `>roll | >r [num. lados] [+, -, x, /] [num. modificador]`.' +
        '\n*Suporte para comando de "/":*  ✅', false)
        
        .addField('**Out**', 'Vou imitar sua mensagem (e apagar ela, se eu tiver permissão) quando você usar: `>out | >o <mensagem>`.' +
        '\n*Suporte para comando de "/":*  ✅', false)
        
        .addField('**Jokenpo**', 'Vou jogar uma disputa de jokenpo *(pedra, papel e tesoura)* com você quando você usar: `>jokenpo | >j <mão de escolha>`.' +
        '\n*Suporte para comando de "/":*  ✅', false)
        
        .addField('**Lorem Ipsum**', 'Vou digitar um parágrafo aleatório com palavras do livro "De finibus bonorum et malorum", de Cícero, que pode começar com a frase padrão "Lorem Ipsum..." ao usar o argumento [t], quando você usar: `>loremipsum | >li [t]`.' +
        '\n*Suporte para comando de "/":*  ✅', false)
        
        .addField('**APOD**', 'Receba o APOD (Astronomical Picture Of the Day) da NASA usando: `>apod | >nasa`.' +
        '\n*Suporte para comando de "/":*  ✅', false)
        
        .addField('**Motivação**', 'Vou tentar te motivar se você usar: `>motivação | >motivacao | >m`.' +
        '\n*Suporte para comando de "/":*  ✅', false)
        
        .setFooter('converse com o dev! -> pampolha#0007');

        if (message) return message.channel.send(embed);
        else return embed;
    },
};