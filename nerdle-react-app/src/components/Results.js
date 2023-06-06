import React, { useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";
import { loschmidtDependencies } from "mathjs";

const Results = () => {
    console.log('render')
    const {nerdleNumber, results, setResults, gamesPlayed, setGamesPlayed, guesses} = useGuessesContext()

    useEffect(() => {
        if(!gamesPlayed.includes(nerdleNumber)){
            setGamesPlayed([...gamesPlayed, nerdleNumber])
            let numberOfGuesses = guesses.length/8
            setResults((prev) => {
                let updatedResults = {...prev}
                console.log('prev', prev)
                if(updatedResults[numberOfGuesses] === undefined){
                    updatedResults[numberOfGuesses] = 1
                }else{
                    console.log('got here')
                    updatedResults[numberOfGuesses] += 1
                }
                console.log(results)
                return updatedResults
            })
            
            
        }
    },[nerdleNumber, gamesPlayed, guesses, setGamesPlayed, setResults])

    useEffect(() => {
        localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed))
    }, [gamesPlayed])

    useEffect(() => {
        localStorage.setItem('results', JSON.stringify(results))
        console.log(results)
    }, [results])

    return (
        <></>
    )

}

export default Results