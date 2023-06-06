import React, { createContext, useContext, useState} from 'react'

const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const equation = '9/3*8=24'
    const [nerdleNumber, setNerdleNumber] = useState(4)
    const [guesses, setGuesses] = useState(JSON.parse(localStorage.getItem('guesses')) || [])
    const [currentGuess, setCurrentGuess] = useState([])
    const [classesArray, setClassesArray] = useState(JSON.parse(localStorage.getItem('classesArray')) || [])
    const [keyClassesObj, setKeyClassesObj] = useState({})
    const [messageText, setMessageText] = useState('')
    const [gameOver, setGameOver] = useState(false)


    return(
        <GuessesContext.Provider value={{equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray, keyClassesObj, setKeyClassesObj, messageText, setMessageText, gameOver, setGameOver, nerdleNumber, setNerdleNumber}}>
            {children}
        </GuessesContext.Provider>
    )
}