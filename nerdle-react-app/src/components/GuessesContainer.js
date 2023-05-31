import React from "react";
// import { useGuessesContext } from "../utils/guessesContext";

const GuessesContainer = ()=> {

    // const {guesses, setGuesses} = useGuessesContext()
    // console.log(guesses)

    const boxes = []
    for(let i = 0; i < 48; i++){
        boxes.push(<div className="guessBox" id={`guessBox${i}`}></div>)
    }
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