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
        return mensagem.channel.send(out);
	}

    static assinatura(mensagem)
    {
        const regex = />:\)/;
        if (mensagem.content.match(regex) !== null)
        {
            mensagem.react('😈');
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
            '***>converse com o dev! -> pampolha#0007***');
    }
}

module.exports = Commands;