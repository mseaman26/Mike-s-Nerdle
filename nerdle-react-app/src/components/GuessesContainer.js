import React, { useState } from "react";
import { useEffect } from "react";
const math = require('mathjs')

const GuessesContainer = (props)=> {

    const [guesses, setGuesses] = useState(JSON.parse(localStorage.getItem('guesses')) || [])
    const [currentGuess, setCurrentGuess] = useState([])
    const [classesArray, setClassesArray] = useState(JSON.parse(localStorage.getItem('classesArray')) || [])
    let storedGuesses = JSON.parse(localStorage.getItem('guesses')) || []
    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']

    const evaluateGuesses = () => {
        for(let i = 0; i < guesses.length; i += 8){
            let equationString = ''
            for(let j = i; j < i + 8; j++){
                equationString+=guesses[j]
            }
            if(!equationString.includes('=')){
                console.log('equation must include an equals operator')
            }
        }
    }
    //build boxes
    const boxes = Array.from({ length: 48 }, (_, index) => {
        const text = guesses[index] || ""; // Use data[index] if available, otherwise use an empty string
        return <div key={index} className="guessBox ">{text}</div>;
      });

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
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    }, [currentGuess, setGuesses, setCurrentGuess])

    return(
        <>
        <div className="guessesContainer">
            {boxes}
        </div>
        </>
    )

}

export default GuessesContainer