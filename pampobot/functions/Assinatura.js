module.exports = 
{
    Assinatura(mensagem)
    {
        const regex = />:\)/;
        if (mensagem.content.match(regex))
        {
            return mensagem.react('😈');
        }  
    },
};