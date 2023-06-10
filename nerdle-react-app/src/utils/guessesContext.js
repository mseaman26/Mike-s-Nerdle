import React, { createContext, useContext, useState, useEffect} from 'react'
const equationsFile = require('./shuffled_equations.txt')
let equations


const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const [nerdleNumber, setNerdleNumber] = useState(9)
    const [equation, setEquation] = useState('')
    const [guesses, setGuesses] = useState(JSON.parse(localStorage.getItem('guesses')) || [])
    const [currentGuess, setCurrentGuess] = useState([])
    const [classesArray, setClassesArray] = useState(JSON.parse(localStorage.getItem('classesArray')) || [])
    const [keyClassesObj, setKeyClassesObj] = useState({})
    const [messageText, setMessageText] = useState('')
    const [gameOver, setGameOver] = useState(false)
    const [results, setResults] = useState(JSON.parse(localStorage.getItem('results')) || {})
    const [gamesPlayed, setGamesPlayed] = useState(JSON.parse(localStorage.getItem('gamesPlayed')) || [])


        fetch(equationsFile)
            .then((response) => {
                return response.text()
            })
            .then((text) => {
                equations = text.split('\n')
                
                console.log(equation)
                setEquation(equations[nerdleNumber])
            })


    return(

            <GuessesContext.Provider value={{equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray, keyClassesObj, setKeyClassesObj, messageText, setMessageText, gameOver, setGameOver, nerdleNumber, setNerdleNumber, results, setResults, gamesPlayed, setGamesPlayed}}>
            {children}
            </GuessesContext.Provider>


    )
}