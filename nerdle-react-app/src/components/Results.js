import React, { useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const Results = () => {
    console.log('render')
    const {nerdleNumber, guesses} = useGuessesContext()
    const numberOfGuesses = guesses/8

    useEffect(() => {
        let gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed')) || []
        if(!gamesPlayed.includes(nerdleNumber)){
            gamesPlayed.push(nerdleNumber)
            localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed))
            let results = JSON.parse(localStorage.getItem('results')) || {}
            if(!results[numberOfGuesses]){
                results[numberOfGuesses] = 1
            }else{
                results[numberOfGuesses] += 1
            }
            localStorage.setItem('results', JSON.stringify(results))
        }
    }, [])

    return (
        <></>
    )

}

export default Results