const random = require('random');
const fs = require('fs');
module.exports =
{
    Jokenpo(mensagem)
    {  
        let predefinido;
		if (mensagem.content.startsWith('>jokenpo')) predefinido = mensagem.content.slice(9).split(/\s+/g);
        else predefinido = mensagem.content.slice(3).trim().split(/\s+/g);
        
        if (predefinido[0].toLowerCase().match(/\bpedra\b|\bpapel\b|\btesoura\b/))
        {
            let user;
            switch (predefinido[0].toLowerCase()) 
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
            return resultado(mensagem, user);
        }

        mensagem.reply('*eu aceito o seu desafio...*\n' +
        '**>digite "pedra", "papel" ou "tesoura" quando estiver pronto!**');
        const filtro = msg => 
        {
            const teste = msg.content.toLowerCase().match(/\bpedra\b|\bpapel\b|\btesoura\b/);
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
                const teste = _mensagem.content.toLowerCase().match(/\bpedra\b|\bpapel\b|\btesoura\b/);
                let user;
                switch (teste[0])
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
                coletor.stop();
                return resultado(_mensagem, user);
            }
        });

        function resultado(c_mensagem, user)
        {
            const mao = numero =>
            {
                switch (numero) 
                {
                    case 1:
                        return 'pedra';
                    case 2:
                        return 'papel';
                    case 3:
                        return 'tesoura';
                }
            };

            const bot = random.int(1, 3);
            const _resultado = bot - user;
            const _user = mao(user);
            const _bot = mao(bot);
            if (_resultado === 0)
            {
                c_mensagem.reply(`você jogou: **${_user}**, e eu joguei: **${_bot}!** Empate.`);
            }
            else if (_resultado === 1 || _resultado === -2)
            {
                const antigo = fs.readFileSync('data/jokenpoWins.txt', 'utf-8');
                const atual = (parseInt(antigo) + 1).toString(10);
                fs.writeFileSync('data/jokenpoWins.txt', atual);
                c_mensagem.reply(`você jogou: **${_user}**, e eu joguei: **${_bot}!** ***EU VENCI!***\n` + 
                `> *Meu número de vitórias agora é:*  **${fs.readFileSync('data/jokenpoWins.txt')}!**`);
            }
            else
            {
                c_mensagem.reply(`você jogou: **${_user}**, e eu joguei: **${_bot}!** *e-eu perdi?!*`);
            }
        }
    },
};