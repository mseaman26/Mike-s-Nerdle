
import React from "react";
import GuessesContainer from "./GuessesContainer";
import Keyboard from "./Keyboard";
const math = require('mathjs')

const MainPage = () => {

    const equation = '140/4=35'
    let leftSide = equation.split('=')[0]
    let rightSide = equation.split('=')[1]
    let result 
    console.log(result)
    if(math.evaluate(leftSide) === math.evaluate(rightSide)){
        result = 'true'
    }else{
        result = 'false'
    }
    return(
        <>
        <div id="header"></div>
        <GuessesContainer equation={equation}></GuessesContainer>
        <Keyboard></Keyboard>
        </>
    )
}

export default MainPage