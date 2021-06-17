// random vai ser usado pra gerar números randômicos (é....)
const random = require('random');
class commands
{
    static cc()
    {
        const resultado = random.bool();
        switch (resultado)
        {
            case true:
                return 'cara';
            case false:
                return 'coroa';
        }
    }
}

module.exports = commands;