import React, { createContext, useContext, useState} from 'react'

const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const[guesses, setGuesses] = useState(localStorage.getItem('guesses') || ['1','2'])

    const[currentGuess, setCurrentGuess] = useState([])


    return(
        <GuessesContext.Provider value={{guesses, setGuesses, currentGuess, setCurrentGuess}}>
            {children}
        </GuessesContext.Provider>
    )
}