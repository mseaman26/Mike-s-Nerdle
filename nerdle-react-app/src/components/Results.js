import React, { useEffect, useState } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const Results = () => {
    const {nerdleNumber, guesses} = useGuessesContext()
    const numberOfGuesses = (guesses.length/8)
    const [resultsArray, setResultsArray] = useState([])
    let results = JSON.parse(localStorage.getItem('results')) || {}

    useEffect(() => {
        let gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed')) || []
        if(!gamesPlayed.includes(nerdleNumber)){
            gamesPlayed.push(nerdleNumber)
            localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed))
            
            if(!results[numberOfGuesses]){
                results[numberOfGuesses] = 1
            }else{
                results[numberOfGuesses] += 1
            }
            localStorage.setItem('results', JSON.stringify(results))
            }
            let updatedResultsArray = [];
            for (let i = 1; i <= 6; i++) {
                if (results[i]) {
                 updatedResultsArray.push(results[i]);
                } else {
                updatedResultsArray.push(0);
                }
            }
      setResultsArray(prevResultsArray => [...updatedResultsArray]);

            
        
    }, [setResultsArray])
    let greatest = 0
    for(let result of resultsArray){
        if(result > greatest){
            greatest = result
        }
    }
    return (
        <>
        <h3>Your Results:</h3>
        {resultsArray.map((result, index) => {
            let barWidth = result/greatest*100
            return(
                <div key={`result_div_${index}`}className="single_result">
                    <p key={`result_p_${index}`}>{`${index +1}:`}</p>
                    <div key={`result_bar_container_${index}`} className="result_bar_container">
                        <div key={`result_bar_${index}`}className="result_bar" style={{'width':`${barWidth}%`}}></div>
                    </div>
                    <p key={`result_p2_${index}`}>{`${result}`}</p>
                </div>
            )
        })}
        </>
    )

}

export default Results