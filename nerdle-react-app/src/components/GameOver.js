import React, { useState, useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";
import Results from "./Results";

const GameOver = () => {  

    const {guesses, nerdleNumber, classesArray, results, setResults, gamesPlayed, setGamesPlayed} = useGuessesContext()
    const [gameOverShown, setGameOverShown] = useState(false)
    const handleCloseButton = () => {
        setGameOverShown(false)
    }

    const wonInOne = guesses.length <= 8
    const handleShare = () => {
        const blackTile = '⬛'
        const purpleTile = '🟪'
        const greenTile = '🟩'
        let tilesString = "Mike's Nerdle #"+nerdleNumber+"\n"
        for(let i = 0; i < classesArray.length; i++){
            if(classesArray[i] === 'guessBox correct'){
                tilesString += greenTile
            }else if(classesArray[i] === 'guessBox misplaced'){
                tilesString += purpleTile
            }else if(classesArray[i] === 'guessBox absent'){
                tilesString += blackTile
            }else {
                return tilesString
            }
            if((i+1) % 8 === 0){
                tilesString = tilesString+"\n"
            }
        }
        if (navigator.share) {
            navigator.share({
                title: "Results From Mike's Nerdle:",
                text: tilesString,
              })
              .then(() => console.log('Successful share'))
              .catch((error) => console.log('Error sharing', error));
          } else {
            console.log('Share not supported on this browser, do it the old way.');
          }
    }


    useEffect(() => {
        setTimeout(() => {
            setGameOverShown(true)
        }, 1000);
    }, [])
    return(
        <>
        {gameOverShown ? (
            <div className='gameOver'>
                <div className="gameOverCard">
                    <div className="closeButton" onClick={handleCloseButton}>X</div>
                    <h3 className="gameOverHeader">You won in {guesses.length/8} {wonInOne ? 'guess' : 'guesses'}!</h3>
                    <div className="shareButton" onClick={handleShare}>Share</div>
                    <Results/>
                </div>
            </div>
            
        ) : <></>}
            
        </>
    )
}

export default GameOver