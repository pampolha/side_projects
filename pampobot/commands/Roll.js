const random = require('random');
module.exports =
{
    Roll(mensagem)
    {
        function invalido(_mensagem)
        {
            _mensagem.channel.send(`<@${_mensagem.author.id}> número de lados/modificador inválido!`);
        }

        const regex = /[+\-x/]/;
        let bruto;
        if (mensagem.content.startsWith('>roll')) bruto = mensagem.content.substring(6);
        else bruto = mensagem.content.substring(3);
		const separado = bruto.split(regex, 2);
        const lado = parseInt(separado[0].trim(), 10);
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
    },
};