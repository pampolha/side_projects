module.exports = 
{
    Assinatura(mensagem)
    {
        const regex = />:\)/;
        if (mensagem.content.match(regex) !== null)
        {
            return mensagem.react('😈');
        }  
    },
};