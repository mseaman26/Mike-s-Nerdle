import React from "react";
import { useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const GuessesContainer = ()=> {

    const {guesses, setGuesses, currentGuess, setCurrentGuess} = useGuessesContext()
    console.log(guesses)

    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']
    const functionalKeys = ['Enter','Backspace']

    const boxes = []
    for(let i = 0; i < 48; i++){
        boxes.push(<div className="guessBox" id={`guessBox${i}`}></div>)
    }

    const handleKeyDown = (event) => {
        if(equationKeys.includes(event.key)){
            console.log(currentGuess.length)
            if(currentGuess.length < 8){
                setCurrentGuess((prevGuess) => prevGuess + event.key)
            }
            
        }  
    }
    console.log(currentGuess)

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
    }, [currentGuess])
    return(
        <>
        <div className="guessesContainer">
            {boxes.map((box, index) => {
                return(
                    <div key={index} className="guessBoxContainer">
                    {box}
                    </div>
                )
            })}
        </div>
        </>
    )
}

export default GuessesContainer