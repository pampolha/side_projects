module.exports =
{
    Help(mensagem)
    {
        return mensagem.channel
        .send('Comandos:\n' + 
            '**>Cara ou coroa**: jogue uma moeda digitando `>caracoroa`! Você também pode usar `>r`!\n' +
            '**>Dado**: jogue um dado com até um modificador digitando `>roll |num. lados| |"+,-,x,/"| |num. modificador|`! Você também pode usar `>r`!\n' +
            '**>Output**: posso imitar uma mensagem (e apagar a original, se eu tiver permissão) quando você digitar `>out |mensagem|`! Você também pode usar `>o`!\n' +
            '**>Jokenpo**: vou jogar Jokenpo com você ao digitar `>jokenpo`! Você também pode usar `>j`!\n' +
            '\n> *converse com o dev! -> pampolha#0007*');
    },
};