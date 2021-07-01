require('dotenv').config();
const commandsDir = `${process.env.pampobotDir}/commands`;
require('fs').readdirSync(commandsDir)
.forEach(comando => 
    {
        if (comando.match(/\.js$/) !== null && comando !== 'index.js') 
        {
            const nome = comando.replace('.js', '');
            exports[nome] = require(commandsDir + '/' + comando);
        }
    });
const { CaraCoroa } = require(commandsDir + '/CaraCoroa');
const { Help } = require(commandsDir + '/Help');
const { Jokenpo } = require(commandsDir + '/Jokenpo');
const { Roll } = require(commandsDir + '/Roll');
const { Out } = require(commandsDir + '/Out');
const { LoremIpsum } = require(commandsDir + '/LoremIpsum');
const { APOD } = require(commandsDir + '/APOD');
const { Motivacao } = require(commandsDir + '/Motivacao');

module.exports =
{
    checarComandos(mensagem, prefix)
    {
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
    },
};