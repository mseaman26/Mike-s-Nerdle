import React, { useState } from "react";
import { useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const GuessesContainer = ()=> {

    const [guesses, setGuesses] = useState(localStorage.getItem('guesses') || [])
    const [currentGuess, setCurrentGuess] = useState([])
    let storedGuesses = localStorage.getItem('guesses') || []
    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']

    const boxes = Array.from({ length: 48 }, (_, index) => {
        const text = guesses[index] || ""; // Use data[index] if available, otherwise use an empty string
        return <div key={index} className="guessBox">{text}</div>;
      });
    const handleKeyDown = (event) => {
        if(equationKeys.includes(event.key)){
            if(currentGuess.length < 8){
                setCurrentGuess((prevGuess) => [...prevGuess, event.key])
                setGuesses((prevGuesses) => [...storedGuesses, ...currentGuess])
            } 
        } 
        if(event.key === 'Backspace'){
            console.log(currentGuess)
            let newGuess = currentGuess
            newGuess.pop()
            setCurrentGuess(newGuess)
            setGuesses((prevGuesses) => [...storedGuesses, ...currentGuess])
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