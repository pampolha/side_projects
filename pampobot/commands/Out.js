module.exports =
{
    Out(mensagem)
    {
        let out;
        if (mensagem.content.startsWith('>out')) out = mensagem.content.substring(5);
        else out = mensagem.content.substring(3);
        
        if (mensagem.deletable === true)
        {
            mensagem.delete()
            .then(() => console.log(`pampobot apagou uma mensagem no canal "${mensagem.channel.name}" do servidor "${mensagem.guild.name}". Mensagem original: "${out}"`));
        }
        const regex = /<@!830117848034181211>/;
        const check = mensagem.content.match(regex);
        if (check !== null)
        {
            return;
        }
        return mensagem.channel.send(out);
	},
};