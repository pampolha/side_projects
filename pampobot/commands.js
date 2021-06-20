// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// random vai ser usado pra gerar números randômicos (é....)
const random = require('random');
// declarando e instanciando um objeto Client do discord
const { Client } = require('discord.js');
const client = new Client();
// login do bot com token
client.login(process.env.BOT_TOKEN);

class Commands 
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

	static out(mensagem)
    {
        const out = mensagem.content.substring(5);
        if (mensagem.deletable === true)
        {
            mensagem.delete()
            .then(() => console.log(`Mensagem apagada no canal "${mensagem.channel.name}" do servidor "${mensagem.guild.name}". Mensagem original: "${out}"`));
        }
        const regex = /<@!830117848034181211>/;
        const check = mensagem.content.match(regex);
        if (check !== null)
        {
            return;
        }
        return mensagem.channel.send(out);
	}

    static assinatura(mensagem)
    {
        const regex = />:\)/;
        if (mensagem.content.match(regex) !== null)
        {
            mensagem.react('😈');
        }
        const _regex = /<@!830117848034181211>/;
        if (mensagem.content.match(_regex) && mensagem.author.bot === true)
        {
            mensagem.reply('`111110 111010 101001`');
        }   
    }

    static roll(mensagem)
    {
        function invalido(_mensagem)
        {
            _mensagem.channel.send(`<@${_mensagem.author.id}> número de lados/modificador inválido!`);
        }
        const regex = /[+\-x/]/;
        const bruto = mensagem.content.substring(6);
		const separado = bruto.split(regex, 2);
        const lado = parseInt(separado[0].trim(), 10);
        console.log(separado);
        console.log(separado.length);
        if (lado <= 0)
        {
             return invalido(mensagem);
        }
        if (separado.length === 1)
        {
            if (isNaN(lado) === false)
            {
                const resultado = random.int(1, lado);
                return mensagem.channel.send(`<@${mensagem.author.id}> rolou um **D${lado}**, e o resultado foi: ***${resultado}!***`);
            }
            return invalido(mensagem);
        }
        const mod = parseInt(separado[1].trim(), 10);
        if (isNaN(lado) === true || isNaN(mod) === true)
        {
            return invalido(mensagem);
        }
        const operador = bruto.match(regex, 1);
        if (operador === null)
        {
            return invalido(mensagem);
        }
        let resultado;
        const dado = random.int(1, lado);
        switch (operador[0].trim())
        {
            case '+':
                resultado = dado + mod;
                return mensagem.channel.send(`<@${mensagem.author.id}> rolou um **D${lado}+${mod}**, e o resultado foi: *(${dado}+${mod})* = ***${resultado}!***`);
            case '-':
                resultado = dado - mod;
                return mensagem.channel.send(`<@${mensagem.author.id}> rolou um **D${lado}-${mod}**, e o resultado foi: *(${dado}-${mod})* = ***${resultado}!***`);
            case 'x':
                resultado = dado * mod;
                return mensagem.channel.send(`<@${mensagem.author.id}> rolou um **D${lado}x${mod}**, e o resultado foi: *(${dado}x${mod})* = ***${resultado}!***`);
            case '/':
                resultado = dado / mod;
                return mensagem.channel.send(`<@${mensagem.author.id}> rolou um **D${lado}/${mod}**, e o resultado foi: *(${dado}/${mod})* = ***${Math.floor(resultado)}!*** *(arredondado para baixo)*`);
        }
    }

    static help(mensagem)
    {
        return mensagem.channel
        .send('Comandos:\n' + 
            '**>Cara ou coroa**: jogue uma moeda digitando `>cc`!\n' +
            '**>Dado**: jogue um dado com até um modificador digitando `>roll |num. lados| |"+,-,x,/"| |num. modificador|`!\n' +
            '**>Output**: posso imitar uma mensagem (e apagar a original, se eu tiver permissão) quando você digitar `>out |mensagem|`!\n' +
            '**>Jokenpo**: vou jogar Jokenpo com você por 10 segundos ao digitar `>jokenpo`!\n' +
            '***>converse com o dev! -> pampolha#0007***');
    }

    static jokenpo(mensagem)
    {  
        function resultado(c_mensagem, user)
        {
            const bot = random.int(1, 3);
            let _user;
            let _bot;
            switch (user) 
            {
                case 1:
                    _user = 'pedra';
                    break;
                case 2:
                    _user = 'papel';
                    break;
                case 3:
                    _user = 'tesoura';
                    break;
            }
            switch (bot) 
            {
                case 1:
                    _bot = 'pedra';
                    break;
                case 2:
                    _bot = 'papel';
                    break;
                case 3:
                    _bot = 'tesoura';
                    break;
            }
            const _resultado = bot - user;
            if (_resultado === 0)
            {
                c_mensagem.reply(`você jogou: **${_user}**, e eu joguei: **${_bot}!** Empate.`);
            }
            else if (_resultado === 1 || resultado === -2)
            {
                c_mensagem.reply(`você jogou: **${_user}**, e eu joguei: **${_bot}!** *e-eu perdi?!*`);
            }
            else
            {
                c_mensagem.reply(`você jogou: **${_user}**, e eu joguei: **${_bot}!** ***EU VENCI!***`);
            }
        }
        mensagem.reply('*eu aceito o seu desafio...*\n' +
        'digite "pedra","papel" ou "tesoura" quando estiver pronto!');
        const filtro = msg => 
        {
            const teste = msg.content.match(/\bpedra\b|\bpapel\b|\btesoura\b/i);
            switch (teste) {
                case null:
                case undefined:
                    return false;
                default:
                    return true;
            }
        };
        const coletor = mensagem.channel.createMessageCollector(filtro, { time: 10000 });
        coletor.on('collect', _mensagem =>
        {
            if (_mensagem.author.id === mensagem.author.id)
            {
                let user;
                switch (_mensagem.content)
                {
                    case 'pedra':
                        user = 1;
                        break;
                    case 'papel':
                        user = 2;
                        break;
                    case 'tesoura':
                        user = 3;
                        break;
                }
                return resultado(_mensagem, user);
            }
        });
    }
}

module.exports = Commands;