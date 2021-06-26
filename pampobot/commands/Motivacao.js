const random = require('random');
const affirmations = require('C:/Users/pampo/Estudos/Git/side_projects-main/pampobot/data/affirmations.js');
module.exports =
{
    Motivacao(mensagem)
    {
        const escolha = random.int(0, 46);
        return mensagem.reply(`**${affirmations[escolha]}**`);
    },
};