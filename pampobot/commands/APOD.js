const axios = require('axios').default;
const Discord = require('discord.js');
module.exports =
{
    APOD(mensagem)
    {
        mensagem.channel.startTyping();
        
        axios.get('https://api.nasa.gov/planetary/apod?api_key=HG6H36dSnYiVOj76N0eDU9YULnvMseAC6wvIj3nz')
        .then(apod =>
            {   
                const author = apod.data.copyright;
                const title = apod.data.title;
                const explanation = apod.data.explanation;
                const img = apod.data.hdurl;

                const embed = new Discord.MessageEmbed()
                .setAuthor('Imagem astrológica do dia!')
                .setTitle(`${title}`)
                .setDescription(`${explanation}`)  
                .setImage(`${img}`)
                .setFooter(`Foto por: ${author}`);

                mensagem.channel.send(embed);
            })
            .catch(err => 
                {
                    console.error(err);
                    mensagem.channel.send('Ops! *Parece que algo deu errado ao tentar pegar as informações...*');
                });

        mensagem.channel.stopTyping();
    },
};