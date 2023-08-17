import React, { useEffect, useState } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const Results = () => {
    const { nerdleNumber, guesses } = useGuessesContext();
    const numberOfGuesses = Math.floor(guesses.length / 8); // Fixed calculation
    const [resultsArray, setResultsArray] = useState([]);

    useEffect(() => {
        const resultsFromLocalStorage = JSON.parse(localStorage.getItem('results')) || {};
        const gamesPlayed = JSON.parse(localStorage.getItem('gamesPlayed')) || [];

        if (!gamesPlayed.includes(nerdleNumber)) {
            gamesPlayed.push(nerdleNumber);
            localStorage.setItem('gamesPlayed', JSON.stringify(gamesPlayed));

            if (!resultsFromLocalStorage[numberOfGuesses]) {
                resultsFromLocalStorage[numberOfGuesses] = 1;
            } else {
                resultsFromLocalStorage[numberOfGuesses] += 1;
            }

            localStorage.setItem('results', JSON.stringify(resultsFromLocalStorage));
        }

        const updatedResultsArray = new Array(6).fill(0).map((_, index) => resultsFromLocalStorage[index + 1] || 0);
        setResultsArray(updatedResultsArray);

    }, [nerdleNumber, numberOfGuesses]);

    const greatest = Math.max(...resultsArray);

    return (
        <>
            <h3>Your Results:</h3>
            {resultsArray.map((result, index) => {
                const barWidth = (greatest === 0) ? 0 : (result / greatest) * 100;
                return (
                    <div key={`result_div_${index}`} className="single_result">
                        <div className="result_index">
                            <p key={`result_p_${index}`}>{`${index + 1}:`}</p>
                        </div>
                        <div key={`result_bar_container_${index}`} className="result_bar_container">
                            <div key={`result_bar_${index}`} className="result_bar" style={{ 'width': `${barWidth}%` }}></div>
                        </div>
                        <div className="result_p">
                            <p key={`result_p2_${index}`}>{`${result}`}</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default Results;
