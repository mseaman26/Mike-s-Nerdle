import React, { createContext, useContext, useState} from 'react'

const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const equation = '140/4=35'
    const [guesses, setGuesses] = useState(JSON.parse(localStorage.getItem('guesses')) || [])
    const [currentGuess, setCurrentGuess] = useState([])
    const [classesArray, setClassesArray] = useState(JSON.parse(localStorage.getItem('classesArray')) || [])


    return(
        <GuessesContext.Provider value={{equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray}}>
            {children}
        </GuessesContext.Provider>
    )
}