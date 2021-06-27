require('dotenv').config();
const axios = require('axios').default;
const Discord = require('discord.js');
module.exports =
{
    APOD(mensagem)
    {
        mensagem.channel.startTyping();
        
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_KEY}`)
        .then(apod =>
            {   
                const author = apod.data.copyright;
                const title = apod.data.title;
                const explanation = apod.data.explanation;
                const img = apod.data.hdurl;

                const embed = new Discord.MessageEmbed()
                .setAuthor('Imagem astronômica do dia! 🖖')
                .setTitle(`${title}`)
                .setDescription(`${explanation}`)  
                .setImage(`${img}`);

                if (author !== undefined) embed.setFooter(`Foto por: ${author}`);

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