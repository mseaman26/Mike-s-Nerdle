import React from "react";
import { useEffect } from "react";
import { useGuessesContext } from "../utils/guessesContext";
import Keyboard from "./Keyboard";
const math = require('mathjs')

const GuessesContainer = ()=> {
    const {equation, guesses, setGuesses, currentGuess, setCurrentGuess, classesArray, setClassesArray, keyClassesObj, setKeyClassesObj, setMessageText} = useGuessesContext()

    let storedGuesses = JSON.parse(localStorage.getItem('guesses')) || []
    const equationKeys = ['1','2','3','4','5','6','7','8','9','0','+','-','*','/','=']

    //build boxes and color code keys
    const boxes = Array.from({ length: 48 }, (_, index) => {
        const text = guesses[index] || ""; // Use data[index] if available, otherwise use an empty string
   
        return <div key={index} className={classesArray[index] ? classesArray[index] : 'guessBox guessBox_blank'}>{text}</div>;
      });
    
    //color code guesses
    const colorCodeGuess = (guessString) => {
        let newColors = []
        let comparisonEquation = equation.split('')
        for(let i = 0; i < guessString.length; i++){
            //check for absent chars
            if(!comparisonEquation.includes(guessString[i])){
                newColors.push('guessBox absent')
            //check for misplaced chars
            }else if(comparisonEquation.includes(guessString[i]) && equation[i] !== guessString[i]){
                comparisonEquation[comparisonEquation.indexOf(guessString[i])] = 'X'
                newColors.push('guessBox misplaced')
            }else{
                comparisonEquation[comparisonEquation.indexOf(guessString[i])] = 'X'
                newColors.push('guessBox correct')
            }
        }
        setClassesArray([...classesArray,...newColors])
        
    }
    
    const handleKeyDown = (event) => {
        console.log(event)
        let keyEntered
        if(event.key.type === 'click'){
            console.log('this is a click')
            keyEntered = event.key.target.innerText
        }else{
            keyEntered = event.key
        }
        if(equationKeys.includes(keyEntered)){
            if(currentGuess.length < 8){
                console.log('keyEntered, ', keyEntered)
                setCurrentGuess((prevGuess) => [...prevGuess, keyEntered])
                setGuesses([...storedGuesses, ...currentGuess])
            } 
        } 
        if(keyEntered === 'Backspace' || keyEntered === 'Delete'){
            console.log('keyEntered, ', keyEntered)
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
                        if(currentGuessstring === equation){
                            setMessageText('YOU GOT IT!!!!')
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
        
    }, [currentGuess, setGuesses, setCurrentGuess, classesArray,])

    useEffect(() => {
        console.log(keyClassesObj);
    }, [keyClassesObj]);
    useEffect(() => {
        console.log(keyClassesObj);
    }, [setKeyClassesObj])
    

    return(
        <>
        <div className="guessesContainer">
            {boxes}
        </div>
        <Keyboard handleKeyDown={handleKeyDown}></Keyboard>
        </>
    )

}

export default GuessesContainer