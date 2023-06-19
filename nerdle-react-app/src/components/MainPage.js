
import React, { useEffect } from "react";
import GuessesContainer from "./GuessesContainer";
import Keyboard from "./Keyboard";
import { useGuessesContext } from "../utils/guessesContext";


const MainPage = () => {

useEffect(() => {
    window.parent.postMessage({ height: document.body.scrollHeight }, '*');
    console.log('height: ',document.body.scrollHeight )
})

const{ messageText } = useGuessesContext()
    return(
        <>
        <div id="header">{messageText}</div>
        <GuessesContainer></GuessesContainer>
        </>
    )

}

export default MainPage