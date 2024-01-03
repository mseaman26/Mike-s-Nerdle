import React, { createContext, useContext, useState, useEffect} from 'react'
const equationsFile = require('./shuffled_equations.txt')
const dayjs = require('dayjs')
let equations

let dayIndex = dayjs().diff(dayjs('2012-06-08'), 'day') -3944;
// let dayIndex = parseInt(dayjs().format('mm'))
const GuessesContext = createContext()
const pattern = /^\d\d-\d\*\d=\d$/;
// const isMatch = pattern.test(inputString);

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


        // fetch(equationsFile)
        //     .then((response) => {
        //         return response.text()
        //     })
        //     .then((text) => {
        //         equations = text.split('\n')
        //         let date = JSON.parse(localStorage.getItem('date')) || ''
        //         if(dayjs().format('mm') !== date){
        //             localStorage.setItem('date', JSON.stringify(dayjs().format('mm')))
                    
        //             localStorage.setItem('nerdleNumber', nerdleNumber+1)    
        //         }
        //         console.log(nerdleNumber)
        //         setEquation(equations[nerdleNumber])
        //         //setEquation('23+27=50') 
        //     })
        fetch(equationsFile)
        .then((response) => {
           
            return response.text()
        })
        .then((text) => {
            equations = text.split('\n')
            console.log('equations length: ', equations.length)
            for (let i = 0; i < equations.length; i++){
                
                if(pattern.test(equations[i])){
                    console.log(i+1)
                    break
                }
            }
            let date = JSON.parse(localStorage.getItem('date')) || ''
            if(dayIndex !== date){
                localStorage.clear()
                localStorage.setItem('date', JSON.stringify(dayIndex))
                
                localStorage.setItem('nerdleNumber', nerdleNumber+1)    
            }
            console.log(nerdleNumber)
            console.log(equations[nerdleNumber])
            setEquation(equations[nerdleNumber])
            //setEquation(equations[101])
            //console.log(equations[101])
            //setEquation('16-8/1=8') 
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