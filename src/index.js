module.exports = function check(str, bracketsConfig)
{
    let bracketsObj = {};

    for (let i = 0; i < bracketsConfig.length; i ++)
    {
        for (let j = 0; j < bracketsConfig[i].length; j ++)
        {
            var brackAsKey = bracketsConfig[i][j];

            if( bracketsObj[brackAsKey] !== undefined)
            {
                bracketsObj[brackAsKey] = {isThisTheSameSubArr: i, isTheSameBrack: true, name: brackAsKey};
            }
            else
            {
                bracketsObj[brackAsKey] = {isOpen: j === 0 ? true : false, isThisTheSameSubArr: i, name: brackAsKey};
            }
        }
    }

    let openBrackets = [];

    for (let i = 0; i < str.length; i ++)
    {
        var currSymb = str[i];
        var currSymbValue = bracketsObj[currSymb];
        let isOpen = currSymbValue.isOpen || (currSymbValue.isTheSameBrack === true && openBrackets.some((x) => {return x.name === currSymbValue.name}) !== true);

        if (isOpen === true)
        {
            openBrackets.push(currSymbValue);
        }
        else
        {
            if (openBrackets.length > 0)
            {
                let theLastArrElem = openBrackets[openBrackets.length-1];
                if (currSymbValue.isThisTheSameSubArr === theLastArrElem.isThisTheSameSubArr)
                {
                    openBrackets.splice(openBrackets.length-1, 1);
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
    }
    if (openBrackets.length !== 0)
    {
        return false;
    }
    return true;
}