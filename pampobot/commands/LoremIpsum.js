const axios = require('axios');
module.exports =
{
    LoremIpsum(mensagem)
    {
        const arg = mensagem.content.split(/\s+/g);
        axios.default.get('https://loripsum.net/api/1/medium/plaintext')
        .then(get =>
            {
                if (arg[1] !== undefined && arg[1].toLowerCase().trim() === 't') return mensagem.channel.send(`> *${get.data.trim()}*`);
                else if (arg[2] !== undefined && arg[2].toLowerCase().trim() === 't') return mensagem.channel.send(`> *${get.data.trim()}*`);
                else return mensagem.channel.send(`> *${get.data.substring(57).trim()}*`);
            })
            .catch(err => console.error(err));
    },
};