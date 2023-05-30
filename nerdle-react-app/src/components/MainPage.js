
import React from "react";
const math = require('mathjs')

const MainPage = () => {

    const equation = '1+2+3*4=15'
    let leftSide = equation.split('=')[0]
    let rightSide = equation.split('=')[1]
    let result = math.evaluate(leftSide) === math.evaluate(rightSide)
    console.log(result)
    return(
        <>{result}</>
    )
}

export default MainPage