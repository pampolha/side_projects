const random = require('random');
const affirmations = require(process.env.pampobotDir + '/data/affirmations');
module.exports =
{
    Motivacao(mensagem)
    {
        const escolha = random.int(0, (affirmations.length - 1)); 
        return mensagem.reply(`**${affirmations[escolha]}**`);
    },
};