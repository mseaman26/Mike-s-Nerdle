import React from "react";
import { useEffect, useState } from "react";
import { useGuessesContext } from "../utils/guessesContext";
import Keyboard from "./Keyboard";
import GameOver from "./GameOver";
import buildCommunicative from '../utils/buildCommunicative'
const math = require('mathjs')



const GuessesContainer = ()=> {
    const {equation, setNerdleNumber, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray, keyClassesObj, setKeyClassesObj, setMessageText, gameOver, setGameOver, nerdleNumber} = useGuessesContext()

    const [communicative, setCommunicative] = useState(buildCommunicative(equation))
    let storedGuesses = JSON.parse(localStorage.getItem('guesses')) || []
    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']


    const newGame = () => {
        const previousNerdleNumber = JSON.parse(localStorage.getItem('nerdleNumber'))
        if(nerdleNumber !== previousNerdleNumber){
            setGuesses([])
            setClassesArray([])
            setKeyClassesObj({})
            localStorage.removeItem('guesses')
            localStorage.removeItem('classesArray')
            
            localStorage.setItem('nerdleNumber', JSON.stringify(nerdleNumber))
            updateKeys()
            window.location.reload()
        }
    }
    //build boxes and color code keys
    const boxes = Array.from({ length: 48 }, (_, index) => {
        const text = guesses[index] || ""; // Use data[index] if available, otherwise use an empty string
   
        return <div key={index} className={classesArray[index] ? classesArray[index] : 'guessBox guessBox_blank'}>{text}</div>;
      });
   
    //color code guesses
    const colorCodeGuess = (guessString) => {
        let newColors = ["","","","","","","",""]
        let compCom = [...communicative]
        //check for correct letters
        const checkGreens = () => {
            for(let i = 0; i < guessString.length; i++){
                for(let j = 0; j < compCom.length; j++){
                    if(guessString[i] === compCom[j][i] && compCom[j][i] !== 'X'){
                        newColors[i] = 'guessBox correct'
                        setCommunicative((prev) => {
                            return prev.filter((eq) => {
                                return eq[i] === guessString[i]
                            })
                        })
                        compCom = compCom.filter((eq) => {
                            return eq[i] === guessString[i]
                        })
                        for(let k = 0; k < compCom.length; k++){
                            if(compCom[k][i] === guessString[i]){
                                let strArray = compCom[k].split('')
                                strArray[i] = 'X'
                                compCom[k] = strArray.join('')
                            }
                        }
                        checkGreens()
                    }
                }
            }
        
        }
        
        checkGreens() 
        console.log('after check greens, compcom = ', compCom)  
        
        //check for misplaced chars

        for(let i = 0; i < guessString.length; i++){
            if(compCom[0].includes(guessString[i])){
                let strArray = compCom[0].split('')
                strArray[strArray.indexOf(guessString[i])] = 'X'
                compCom[0] = strArray.join('')
                newColors[i] = 'guessBox misplaced'
            }
        }

        //check for absent
        for(let i = 0; i < guessString.length; i++){
            if(newColors[i] === ''){
                newColors[i] = 'guessBox absent'
            }
        }
 
        setClassesArray([...classesArray,...newColors])
        
    }
    
    const checkLastGuess =  () => {
        console.log('checking last guess')
        if(guesses.length >= 8){
            let lastGuess = ''
            for(let i = guesses.length - 8; i < guesses.length; i++){
                lastGuess += guesses[i]
            }
            for(let i = 0; i < communicative.length; i++){
                if(lastGuess === communicative[i]){
                    setGameOver(true)
                }
            }
        }
    }

    const handleKeyDown = (event) => {
        if(gameOver === true){
            return
        }
        let keyEntered
        if(event.key.type === 'click'){
            keyEntered = event.key.target.innerText
        }else{
            keyEntered = event.key
        }
        if(equationKeys.includes(keyEntered)){
            //this is where  the logic for editing equation will go
            if(currentGuess.length < 8){
                setCurrentGuess((prevGuess) => [...prevGuess, keyEntered])
                setGuesses([...storedGuesses, ...currentGuess])
            } 
        } 
        if(keyEntered === 'Backspace' || keyEntered === 'Delete'){
            setMessageText('')
            let newGuess = currentGuess
            newGuess.pop()
            setCurrentGuess(newGuess)
            setGuesses([...storedGuesses, ...currentGuess])
        }  

        //Evaluate Guess
        if(keyEntered === 'Enter'){
            if(currentGuess.length === 8){
                let currentGuessstring = ''
                for(let i = 0; i < currentGuess.length; i++){
                    currentGuessstring += currentGuess[i]
                }
                let leftSide = currentGuessstring.split('=')[0]
                let rightSide = currentGuessstring.split('=')[1]

                if(rightSide && leftSide){
                    if(math.evaluate(leftSide) === math.evaluate(rightSide)){
                        setGuesses([...storedGuesses, ...currentGuess])
                        localStorage.setItem('guesses', JSON.stringify([...storedGuesses,...currentGuess]))
                        setCurrentGuess([])
                        colorCodeGuess(currentGuessstring)
                        for(let i = 0; i < communicative.length; i++){
                            if(communicative[i] === currentGuessstring){
                                setMessageText('YOU GOT IT!!!!')
                                setGameOver(true)
                                window.parent.postMessage({ 
                                    nerdleNumber:nerdleNumber,
                                    result: (guesses.length + 1)/8
                                }, '*');
                            }
                        }
                    }else{
                        setMessageText('That equation does not compute!')
                    }
                }else{
                    setMessageText('You need to propery place an equals sign in your equation!')
                }
                
                
            }else{
                setMessageText('Your equation must be 8 characters long and include an equals sign')
            }
        }
    }
    const updateKeys = () => {
        setKeyClassesObj((prevKeyClassesObj) => {
          const updatedKeyClassesObj = { ...prevKeyClassesObj };
      
          for (let i = 0; i < guesses.length; i++) {
            if (classesArray[i] === "guessBox correct") {
              updatedKeyClassesObj[guesses[i]] = "correct";
            } else if (
              classesArray[i] === "guessBox misplaced" &&
              updatedKeyClassesObj[guesses[i]] !== "correct"
            ) {
              updatedKeyClassesObj[guesses[i]] = "misplaced";
            } else if (
              classesArray[i] === "guessBox absent" &&
              updatedKeyClassesObj[guesses[i]] !== "correct" &&
              updatedKeyClassesObj[guesses[i]] !== "misplaced"
            ) {
              updatedKeyClassesObj[guesses[i]] = "absent";
            }
          }
      
          return updatedKeyClassesObj;
        });
      };
    useEffect (() => {
        checkLastGuess()
    }, [equation, communicative])   
    
    useEffect(() => {
        
        const updateGuesses = () => {
            setGuesses([...storedGuesses, ...currentGuess]);
          };
        window.addEventListener('keydown', handleKeyDown)
        updateGuesses()
        
        localStorage.setItem('classesArray', JSON.stringify(classesArray))
        updateKeys()
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
          };
        
    }, [currentGuess, setGuesses, setCurrentGuess, classesArray, nerdleNumber, equation])


    useEffect(() => {
        newGame()
    },[nerdleNumber, keyClassesObj])
    
    useEffect(() => {
        setCommunicative(buildCommunicative(equation));
      }, [equation]);
    return(
        <>
        <div className="guessesContainer">
            {boxes}
        </div>
        <Keyboard handleKeyDown={handleKeyDown}></Keyboard>
        {gameOver ? (
            
            <GameOver></GameOver>
        ) : <></>}
        </>
    )

}

export default GuessesContainer