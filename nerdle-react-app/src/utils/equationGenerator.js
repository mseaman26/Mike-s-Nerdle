

const math = require('mathjs')

const generateEquation = () => {
    let numberLength = Math.floor(Math.random() * 3) + 1
    let numberOfNumbers = Math.floor(Math.random() * 2) + 2
    const operators = ['+', '-','*','/']
    let equationString = ''
    const makeSingleNumber = () => {
        let numberString = ''
        for(let i = 0; i < numberLength; i++){
            numberString += Math.floor(Math.random() * 10).toString()
            if(i ===0 && numberString === '0')
            return makeSingleNumber()
        }
        return numberString
    }
    for(let i = 0; i < numberOfNumbers; i++){
        if(i === numberOfNumbers - 1){
            equationString += makeSingleNumber()
        }else{
            equationString += makeSingleNumber() + operators[Math.floor(Math.random()*4)]
        }
    }
    let answer = math.evaluate(equationString)
    if(answer<0){
        return generateEquation()
    }
    if(Number.isInteger(answer) === false){
        return generateEquation()
    }
    if(equationString.length +answer.toString().length !== 7){
        return generateEquation()
    }
  
    
    else{
        return equationString
    }

    
    

}

export default generateEquation
