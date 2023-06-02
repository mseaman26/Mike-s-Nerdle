import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";
const math = require('mathjs')

const GuessesContainer = ()=> {
    const {equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray} = useGuessesContext()

    let storedGuesses = JSON.parse(localStorage.getItem('guesses')) || []
    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']

    //build boxes
    const boxes = Array.from({ length: 48 }, (_, index) => {
        const text = guesses[index] || ""; // Use data[index] if available, otherwise use an empty string
        return <div key={index} className={classesArray[index] ? classesArray[index] : 'guessBox guessBox_blank'}>{text}</div>;
      });
    
    //color code guesses
    const colorCodeGuess = (guessString) => {
        console.log('equation = ', equation)
        let newColors = []
        let comparisonEquation = equation.split('')
        for(let i = 0; i < guessString.length; i++){
            //check for absent chars
            if(!comparisonEquation.includes(guessString[i])){
                newColors.push('guessBox guessBox_absent')
            //
            }else if(comparisonEquation.includes(guessString[i]) && comparisonEquation[i] !== guessString[i]){
                comparisonEquation[comparisonEquation.indexOf(guessString[i])] = 'X'
                newColors.push('guessBox guessBox_misplaced')
            }else{
                comparisonEquation[comparisonEquation.indexOf(guessString[i])] = 'X'
                newColors.push('guessBox guessBox_correct')
                console.log(classesArray.length)
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
        localStorage.setItem('classesArray', JSON.stringify(classesArray))
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