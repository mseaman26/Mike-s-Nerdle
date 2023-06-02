import React from "react";
import { useGuessesContext } from "../utils/guessesContext";

const Keyboard = () => {

    const row1 = ['1','2','3','4','5','6','7','8','9','0']
    const row2 = ['+','-','*','/','=','Enter','Delete']
    return(
        <>
            <div id="keyboardRow1">
                {row1.map((key, index) => {
                    return (
                        <div key={index} className="keyButton keyButtonRow1">
                            {key}
                        </div>
                    )
                })}
            </div>
            <div id='keyboardRow2'>
                {row2.map((key, index) => {
                    return(
                        <div key={index} className="keyButton keyButtonRow2">
                            {key}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Keyboard