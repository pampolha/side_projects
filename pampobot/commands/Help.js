module.exports =
{
    Help(mensagem)
    {
        return mensagem.channel
        .send('**Comandos**: |*linhas em itálico representam argumentos opcionais!*|\n' + 
            '**>Cara ou coroa**: Jogue uma moeda e veja o resultado usando: `>caracoroa`, `>cc` !\n' +
            '**>Dado**: Jogue um dado com até um modificador usando: `>roll`, `>r` `num. lados` |*+,-,x,/*| |*num. modificador*| !\n' +
            '**>Output**: Vou imitar sua mensagem (e apagar a original, se eu tiver permissão) quando você usar: `>out`, `>o` `mensagem` !\n' +
            '**>Jokenpo**: Vou jogar jokenpo com você quando você usar: `>jokenpo`, `>j` |*mão de escolha*|!\n' +
            '**>Lorem Ipsum**: Vou escrever um parágrafo aleatório do tipo Lorem Ipsum quando você usar: `>loremipsum`, `>li` |*t (para incluir o início padrão Lorem Ipsum)*| !\n' +
            '**>APOD**: Receba o APOD (Astronomical Picture Of the Day) da NASA usando: `>apod` !\n' +
            '**>Motivação**: Vou tentar te motivar se você usar: `>m`, `>motivacao` !\n' +
            '\n> *converse com o dev! -> pampolha#0007*');
    },
};