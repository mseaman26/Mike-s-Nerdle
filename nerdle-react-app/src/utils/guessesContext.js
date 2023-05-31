import React, { createContext, useContext, useState} from 'react'

const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const[guesses, setGuesses] = useState(localStorage.getItem('guesses') || [])


    return(
        <GuessesContext.Provider value={{guesses, setGuesses}}>
            {children}
        </GuessesContext.Provider>
    )
}