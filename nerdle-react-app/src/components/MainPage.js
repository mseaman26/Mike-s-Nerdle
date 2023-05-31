
import React from "react";
import GuessesContainer from "./GuessesContainer";
import Keyboard from "./Keyboard";
import { useEffect } from "react";
const math = require('mathjs')

const MainPage = () => {

    const equation = '140/4=35'
    let leftSide = equation.split('=')[0]
    let rightSide = equation.split('=')[1]


    let currentGuess = ''
    let currentGuessIndex = 0

    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']
    const functionalKeys = ['Enter','Backspace']

    function displayCurrentGuess(){
        for(let i = 0; i < currentGuess.length; i++){

        }
    }

    const handleKeyDown = (event) => {
        if(equationKeys.includes(event.key)){
            if(currentGuess.length < 8){
                currentGuess += event.key
            }
            console.log(currentGuess)
        }  
    }

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
    }, [])
    return(
        <>
        <div id="header"></div>
        <GuessesContainer equation={equation}></GuessesContainer>
        <Keyboard></Keyboard>
        </>
    )

}

export default MainPage