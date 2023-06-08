import React, { createContext, useContext, useState} from 'react'

const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const equation = '4+15/3=9'
    const [nerdleNumber, setNerdleNumber] = useState(28)
    const [guesses, setGuesses] = useState(JSON.parse(localStorage.getItem('guesses')) || [])
    const [currentGuess, setCurrentGuess] = useState([])
    const [classesArray, setClassesArray] = useState(JSON.parse(localStorage.getItem('classesArray')) || [])
    const [keyClassesObj, setKeyClassesObj] = useState({})
    const [messageText, setMessageText] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [results, setResults] = useState(JSON.parse(localStorage.getItem('results')) || {})
    const [gamesPlayed, setGamesPlayed] = useState(JSON.parse(localStorage.getItem('gamesPlayed')) || [])


    return(
        <GuessesContext.Provider value={{equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray, keyClassesObj, setKeyClassesObj, messageText, setMessageText, gameOver, setGameOver, nerdleNumber, setNerdleNumber, results, setResults, gamesPlayed, setGamesPlayed}}>
            {children}
        </GuessesContext.Provider>
    )
}