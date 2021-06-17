// random vai ser usado pra gerar números randômicos (é....)
const random = require('random');
// pra esconder o token do bot em uma variável de ambiente
require('dotenv').config();
// criando um objeto a partir do package
const { Client } = require('discord.js');
// instanciando um objeto do tipo criado acima
const client = new Client;
// variável que contém o prefixo do bot pra uma manutenção mais eficiente
const prefixo = '>';

// login do bot com token
client.login(process.env.BOT_TOKEN);

class commands
{
    static cc()
    {
        const resultado = random.boolean();
        switch (resultado)
        {
            case true:
                return 'cara';
            case false:
                return 'coroa';
        }
    }
}

module.exports = commands;