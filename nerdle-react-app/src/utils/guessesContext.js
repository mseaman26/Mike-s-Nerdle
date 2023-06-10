import React, { createContext, useContext, useState, useEffect} from 'react'
const equationsFile = require('./shuffled_equations.txt')
const dayjs = require('dayjs')
let equations

let dayIndex = parseInt(dayjs().format('D')) - dayjs('2012-06-08').format('D')+5
// let dayIndex = parseInt(dayjs().format('mm'))
const GuessesContext = createContext()

export const useGuessesContext = () => useContext(GuessesContext)

export const GuessesProvider = ({children}) => {

    const [nerdleNumber, setNerdleNumber] = useState(dayIndex)
    // const [nerdleNumber, setNerdleNumber] = useState(dayjs().format('ss'))
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
                let date = JSON.parse(localStorage.getItem('date')) || ''
                // if(dayjs().format('mm') !== date){
                //     localStorage.setItem('date', JSON.stringify(dayjs().format('mm')))
                    
                //     localStorage.setItem('nerdleNumber', nerdleNumber+1)
                // }
                // console.log(nerdleNumber)
                setEquation(equations[nerdleNumber])
            })

            useEffect(() => {
                localStorage.setItem('nerdleNumber', nerdleNumber)
            }, [nerdleNumber])
    return(

            <GuessesContext.Provider value={{equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray, keyClassesObj, setKeyClassesObj, messageText, setMessageText, gameOver, setGameOver, nerdleNumber, setNerdleNumber, results, setResults, gamesPlayed, setGamesPlayed}}>
            {children}
            </GuessesContext.Provider>


    )
}