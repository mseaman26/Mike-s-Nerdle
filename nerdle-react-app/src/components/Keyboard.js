import React, { useContext } from "react";
import { useGuessesContext } from "../utils/guessesContext";

const Keyboard = (props) => {

    const {keyClassesObj, setKeyClassesObj} = useGuessesContext()
    const row1 = ['1','2','3','4','5','6','7','8','9','0']
    const row2 = ['+','-','*','/','=','Enter','Delete']

    const handleKeyClick = (key) => {
        props.handleKeyDown({ key: key });
      };
    
    return(
        <>
            <div id="keyboardRow1">
                
                {row1.map((key, index) => {
                    return (
                        <div key={index} className={`keyButton keyButtonRow1 ${keyClassesObj[key] ? keyClassesObj[key] : 'keyButton_blank'}`} onClick={handleKeyClick}>
                            {key}
                        </div>
                    )
                })}
            </div>
            <div id='keyboardRow2'>
                {row2.map((key, index) => {
                    return(
                        <div key={index} className={`keyButton keyButtonRow2 ${keyClassesObj[key] ? keyClassesObj[key] : 'keyButton_blank'}`} onClick={handleKeyClick}>
                            {key}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Keyboard