import React, { useState } from "react";
import { useEffect } from "react";
const math = require('mathjs')

const GuessesContainer = (props)=> {

    const equation = '140/4=35'
    const [guesses, setGuesses] = useState(JSON.parse(localStorage.getItem('guesses')) || [])
    const [currentGuess, setCurrentGuess] = useState([])
    const [classesArray, setClassesArray] = useState(JSON.parse(localStorage.getItem('classesArray')) || [])
    let storedGuesses = JSON.parse(localStorage.getItem('guesses')) || []
    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']

    //build boxes
    const boxes = Array.from({ length: 48 }, (_, index) => {
        const text = guesses[index] || ""; // Use data[index] if available, otherwise use an empty string
        return <div key={index} className={classesArray[index] ? classesArray[index] : 'guessBox guessBox_blank'}>{text}</div>;
      });
    
    //color code gues
    const colorCodeGuess = (guessString) => {
        console.log('equation = ', equation)
        let newColors = []
        let comparisonEquation = equation.split('')
        for(let i = 0; i < guessString.length; i++){
            //check for absent chars
            if(!comparisonEquation.includes(guessString[i])){
                newColors.push('guessBox guessBox_absent')
            }else{
                newColors.push('')
                console.log(classesArray)
            }
            console.log(classesArray)
        }
        setClassesArray([...classesArray,...newColors])
    }
    
    const handleKeyDown = (event) => {
        if(equationKeys.includes(event.key)){
            if(currentGuess.length < 8){
                setCurrentGuess((prevGuess) => [...prevGuess, event.key])
                setGuesses([...storedGuesses, ...currentGuess])
            } 
        } 
        if(event.key === 'Backspace'){
            let newGuess = currentGuess
            newGuess.pop()
            setCurrentGuess(newGuess)
            setGuesses([...storedGuesses, ...currentGuess])
        }  

        //Evaluate Guess
        if(event.key === 'Enter'){
            if(currentGuess.length === 8){
                let currentGuessstring = ''
                for(let i = 0; i < currentGuess.length; i++){
                    currentGuessstring += currentGuess[i]
                }
                let leftSide = currentGuessstring.split('=')[0]
                let rightSide = currentGuessstring.split('=')[1]
                console.log(leftSide, rightSide)

                if(rightSide && leftSide){
                    if(math.evaluate(leftSide) === math.evaluate(rightSide)){
                        console.log('equation evaluates correctly')
                        setGuesses([...storedGuesses, ...currentGuess])
                        localStorage.setItem('guesses', JSON.stringify([...storedGuesses,...currentGuess]))
                        setCurrentGuess([])
                        colorCodeGuess(currentGuessstring)
                    }else{
                        console.log('that equation does not compute')
                    }
                }else{
                    console.log('you need to propery place an equals sign in your equation')
                }
                
                
            }
        }
    }

    
    useEffect(() => {
        const updateGuesses = () => {
            setGuesses([...storedGuesses, ...currentGuess]);
          };
        window.addEventListener('keydown', handleKeyDown)
        updateGuesses()
        console.log(classesArray)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    }, [currentGuess, setGuesses, setCurrentGuess, classesArray])

    return(
        <>
        <div className="guessesContainer">
            {boxes}
        </div>
        </>
    )

}

export default GuessesContainer