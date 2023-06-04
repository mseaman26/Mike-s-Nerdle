import React, { useState, useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const GameOver = () => {  

    const {guesses} = useGuessesContext()
    const [gameOverShown, setGameOverShown] = useState(false)
    const handleCloseButton = () => {
        setGameOverShown(false)
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
                    <button className="closeButton" onClick={handleCloseButton}>X</button>
                    <h3>You won in {guesses.length/8} guesses</h3>
                </div>
            </div>
        ) : <></>}
            
        </>
    )
}

export default GameOver