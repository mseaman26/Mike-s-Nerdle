
import React from "react";
import GuessesContainer from "./GuessesContainer";
import Keyboard from "./Keyboard";
import { useGuessesContext } from "../utils/guessesContext";


const MainPage = () => {

const{ messageText } = useGuessesContext()
    return(
        <>
        <div id="header">{messageText}</div>
        <GuessesContainer></GuessesContainer>
        </>
    )

}

export default MainPage